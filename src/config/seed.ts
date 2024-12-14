import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import dayjs from "dayjs";

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
    employee: [
        "VIEW_PRODUCTS",
        "VIEW_ORDERS",
        "CREATE_ORDERS"
    ]
}

const run = async () => {
    console.log("Seed function running...");

    await prisma.refreshToken.deleteMany();
    await prisma.user.deleteMany();
    await prisma.permission.deleteMany();
    await prisma.role.deleteMany();

    const rolePromises = roles.map((roleName) =>
        prisma.role.create({ data: { name: roleName } })
    );

    const createdRoles = await Promise.all(rolePromises);

    const superAdminRole = createdRoles.find((role) => role.name === "SUPER_ADMIN");
    if (superAdminRole) {
        const permissionPromises = permission.superUser.map((permName) =>
                prisma.permission.create({
                    data: {
                    name: permName,
                    roles: {
                        connect: { id: superAdminRole.id },
                    },
                },
            })
        );
        await Promise.all(permissionPromises);
    }

    const AdminRole = createdRoles.find((role) => role.name === "ADMIN");
    if (AdminRole) {
        const permissionPromises = permission.admin.map((permName) =>
            prisma.permission.update({
                where: { name: permName },
                data: {
                    roles: { 
                        connect: {
                            id: AdminRole.id
                        }
                    }
                }
            })
        );
        await Promise.all(permissionPromises);
    }

    const EmployeeRole = createdRoles.find((role) => role.name === "EMPLOYEE");
    if (EmployeeRole) {
        const permissionPromises = permission.employee.map((permName) =>
            prisma.permission.update({
                where: { name: permName },
                data: {
                    roles: { 
                        connect: {
                            id: EmployeeRole.id
                        }
                    }
                }
            })
        );
        await Promise.all(permissionPromises);
    }

    const users = [
        {
            name: "Billing System",
            email: "billing.system@superadmin.com",
            password: bcrypt.hashSync("1q2w3e4r5##", 10),
            roles: { connect: { id:  superAdminRole?.id } }
        },
        {
            name: "João Sacala",
            email: "joaosacala@gmail.com",
            password: bcrypt.hashSync("password", 10),
            roles: { connect: { id:  AdminRole?.id } }
        },
    ]

    const usersPromisses = users.map(user => prisma.user.create({ data: user }));
    await Promise.all(usersPromisses);

    console.log("Seed function finished successfully.");
};

run()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
    });
