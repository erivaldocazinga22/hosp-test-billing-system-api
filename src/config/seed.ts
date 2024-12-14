import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import url from "node:url";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();
const roles = ["SUPER_ADMIN", "ADMIN", "EMPLOYEE"];

const permission = {
  admin: [
    "VIEW_USERS",
    "CREATE_USERS",
    "DELETE_USERS",
    "VIEW_PERMISSIONS",
    "CREATE_PERMISSIONS",
    "UPDATE_PERMISSIONS",
    "DELETE_PERMISSIONS",
    "VIEW_ROLES",
    "VIEW_PRODUCTS",
    "CREATE_PRODUCTS",
    "UPDATE_PRODUCTS",
    "DELETE_PRODUCTS",
    "VIEW_ORDERS",
    "CREATE_ORDERS",
    "UPDATE_ORDERS",
    "DELETE_ORDERS",
  ],
  superUser: [
    "VIEW_USERS",
    "CREATE_USERS",
    "UPDATE_USERS",
    "DELETE_USERS",
    "VIEW_PERMISSIONS",
    "CREATE_PERMISSIONS",
    "UPDATE_PERMISSIONS",
    "DELETE_PERMISSIONS",
    "VIEW_ROLES",
    "CREATE_ROLES",
    "UPDATE_ROLES",
    "DELETE_ROLES",
    "VIEW_PRODUCTS",
    "CREATE_PRODUCTS",
    "UPDATE_PRODUCTS",
    "DELETE_PRODUCTS",
    "VIEW_ORDERS",
    "CREATE_ORDERS",
    "UPDATE_ORDERS",
    "DELETE_ORDERS",
  ],
  employee: ["VIEW_PRODUCTS", "VIEW_ORDERS", "CREATE_ORDERS"],
};

function extractPublicId(imageUrl: string): string {
  const parsedUrl = url.parse(imageUrl);
  const pathSegments = parsedUrl.pathname?.split('/');
  return pathSegments?.[pathSegments.length - 1]?.split('.')[0] || '';
}

const run = async () => {
  console.log("Seed function running...");

  // Excluindo imagens da Cloudinary
  const allUsers = await prisma.user.findMany();
  for (const user of allUsers) {
    const imageUrl = user.avatarUrl;
    if (imageUrl) {
      const publicId = extractPublicId(imageUrl);
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId);
          console.log(`Imagem ${publicId} excluída da Cloudinary`);
        } catch (error) {
          console.error(`Erro ao excluir a imagem ${publicId}:`, error);
        }
      }
    }
  }

  // Limpando dados anteriores
  await prisma.refreshToken.deleteMany();
  await prisma.user.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.role.deleteMany();

  // Criando roles
  const createdRoles = await Promise.all(
    roles.map((roleName) => prisma.role.create({ data: { name: roleName } }))
  );

  // Função para criar permissões e associá-las com os roles
  const createPermissionsForRole = async (
    roleName: string,
    permissionList: string[]
  ) => {
    const role = createdRoles.find((role) => role.name === roleName);
    if (!role) return;

    const permissionPromises = permissionList.map((permName) =>
      prisma.permission.upsert({
        where: { name: permName },
        update: {},
        create: { name: permName },
      }).then((permission) =>
        prisma.permission.update({
          where: { id: permission.id },
          data: {
            roles: {
              connect: { id: role.id },
            },
          },
        })
      )
    );

    await Promise.all(permissionPromises);
  };

  // Criando permissões para os roles
  await createPermissionsForRole("SUPER_ADMIN", permission.superUser);
  await createPermissionsForRole("ADMIN", permission.admin);
  await createPermissionsForRole("EMPLOYEE", permission.employee);

  // Criando usuários
  const users = [
    {
      name: "Billing System",
      email: "billing.system@superadmin.com",
      password: bcrypt.hashSync("1q2w3e4r5##", 10),
      roles: { connect: { id: createdRoles.find((role) => role.name === "SUPER_ADMIN")?.id } },
    },
    {
      name: "João Sacala",
      email: "joaosacala@gmail.com",
      password: bcrypt.hashSync("password", 10),
      roles: { connect: { id: createdRoles.find((role) => role.name === "ADMIN")?.id } },
    },
  ];

  await Promise.all(users.map((user) => prisma.user.create({ data: user })));

  console.log("Seed function finished successfully.");
};

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Erro durante o seed:", error);
    await prisma.$disconnect();
  });
