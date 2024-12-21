import { PrismaClient } from "@prisma/client";

const users = [
    // ADMIN Users (10)
    { name: "Alice Johnson", email: "alice.johnson@example.com", password: "securePassword123", roles: "ADMIN" },
    { name: "Bob Smith", email: "bob.smith@example.com", password: "anotherSecurePassword456", roles: "ADMIN" },
    { name: "Charlie Brown", email: "charlie.brown@example.com", password: "yetAnotherSecurePassword789", roles: "ADMIN" },
    { name: "Diana Prince",  email: "diana.prince@example.com", password: "wonderWoman123", roles: "ADMIN" },
    { name: "Edward Norton", email: "edward.norton@example.com", password: "fightClub!2024", roles: "ADMIN" },
    { name: "Fiona Green", email: "fiona.green@example.com", password: "fionaSecure123", roles: "ADMIN" },
    { name: "George White",  email: "george.white@example.com", password: "georgeSecure456", roles: "ADMIN" },
    { name: "Hannah Black", email: "hannah.black@example.com", password: "hannahPassword789", roles: "ADMIN" },
    { name: "Ian Blue", email: "ian.blue@example.com", password: "ianStrongPassword321", roles: "ADMIN" },
    { name: "Jessica Red", email: "jessica.red@example.com", password: "jessicaAdminPass654", roles: "ADMIN" },
  
    // EMPLOYEE Users (30)
    { name: "Kelly Gray", email: "kelly.gray@example.com", password: "employeePass1", roles: "EMPLOYEE" },
    { name: "Liam Gold", email: "liam.gold@example.com", password: "employeePass2", roles: "EMPLOYEE" },
    { name: "Mia Silver", email: "mia.silver@example.com", password: "employeePass3", roles: "EMPLOYEE" },
    { name: "Noah Bronze", email: "noah.bronze@example.com", password: "employeePass4", roles: "EMPLOYEE" },
    { name: "Olivia Platinum", email: "olivia.platinum@example.com", password: "employeePass5", roles: "EMPLOYEE" },
    { name: "Paul Copper", email: "paul.copper@example.com", password: "employeePass6", roles: "EMPLOYEE" },
    { name: "Quinn Diamond", email: "quinn.diamond@example.com", password: "employeePass7", roles: "EMPLOYEE" },
    { name: "Ruby Emerald",  email: "ruby.emerald@example.com", password: "employeePass8", roles: "EMPLOYEE" },
    { name: "Samuel Garnet", email: "samuel.garnet@example.com", password: "employeePass9", roles: "EMPLOYEE" },
    { name: "Tina Amethyst", email: "tina.amethyst@example.com", password: "employeePass10", roles: "EMPLOYEE" },
    { name: "Uma Sapphire", email: "uma.sapphire@example.com", password: "employeePass11", roles: "EMPLOYEE" },
    { name: "Victor Ruby", email: "victor.ruby@example.com", password: "employeePass12", roles: "EMPLOYEE" },
    { name: "Wanda Opal", email: "wanda.opal@example.com", password: "employeePass13", roles: "EMPLOYEE" },
    { name: "Xander Quartz", email: "xander.quartz@example.com", password: "employeePass14", roles: "EMPLOYEE" },
    { name: "Yara Pearl", email: "yara.pearl@example.com", password: "employeePass15", roles: "EMPLOYEE" },
    { name: "Zane Topaz", email: "zane.topaz@example.com", password: "employeePass16", roles: "EMPLOYEE" },
    { name: "Abby Crystal",  email: "abby.crystal@example.com", password: "employeePass17", roles: "EMPLOYEE" },
    { name: "Ben Jade", email: "ben.jade@example.com", password: "employeePass18", roles: "EMPLOYEE" },
    { name: "Cathy Pearl", email: "cathy.pearl@example.com", password: "employeePass19", roles: "EMPLOYEE" },
    { name: "David Amber", email: "david.amber@example.com", password: "employeePass20", roles: "EMPLOYEE" },
    { name: "Eve Coral", email: "eve.coral@example.com", password: "employeePass21", roles: "EMPLOYEE" },
    { name: "Frank Onyx", email: "frank.onyx@example.com", password: "employeePass22", roles: "EMPLOYEE" },
    { name: "Grace Turquoise", email: "grace.turquoise@example.com", password: "employeePass23", roles: "EMPLOYEE" },
    { name: "Harry Lapis", email: "harry.lapis@example.com", password: "employeePass24", roles: "EMPLOYEE" },
    { name: "Ivy Peridot", email: "ivy.peridot@example.com", password: "employeePass25", roles: "EMPLOYEE" },
    { name: "Jack Amber", email: "jack.amber@example.com", password: "employeePass26", roles: "EMPLOYEE" },
    { name: "Karen Tourmaline", email: "karen.tourmaline@example.com", password: "employeePass27", roles: "EMPLOYEE" },
    { name: "Leo Agate", email: "leo.agate@example.com", password: "employeePass28", roles: "EMPLOYEE" },
    { name: "Mona Tanzanite", email: "mona.tanzanite@example.com", password: "employeePass29", roles: "EMPLOYEE" },
    { name: "Nina Spinel", email: "nina.spinel@example.com", password: "employeePass30", roles: "EMPLOYEE" },
];


const prisma = new PrismaClient();

const run = async () => {
    console.log("TEST: Iniciando o seed de dados...");
    await Promise.all(users.map((user) => prisma.user.create({ data: user })));
    console.log("TEST: Seed de dados realizado com sucesso!");
};

run()
  	.then(async () => {
    	await prisma.$disconnect();
  	})
  	.catch(async (error) => {
    	console.error("Erro durante o seed:", error);
    	await prisma.$disconnect();
  	});