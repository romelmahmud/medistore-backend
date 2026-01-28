// src/seeds/seed-medicines.ts
import { prisma } from "../lib/prisma";

// Categories
const categories = [
  "Pain Relief & Fever",
  "Cold, Cough & Flu",
  "Digestive Health",
  "Allergy & Sinus",
  "Vitamins & Supplements",
  "Diabetes Care",
  "Heart & Blood Pressure",
  "Respiratory Care",
  "Infection & Antibiotics",
  "Skin & Hair Care",
  "Women’s Health",
  "Baby & Child Care",
  "Eye, Ear & Dental Care",
  "First Aid & Medical Supplies",
  "Herbal & Alternative Medicine",
];

// Bangladeshi brands with realistic dosages
const medicines: Record<
  string,
  { name: string; brand: string; description: string; dosage: string }[]
> = {
  "Pain Relief & Fever": [
    {
      name: "Paracetamol",
      brand: "Acme",
      description: "Pain relief and fever reducer",
      dosage: "500mg tablet",
    },
    {
      name: "Ibuprofen",
      brand: "Beximco",
      description: "Anti-inflammatory and analgesic",
      dosage: "400mg tablet",
    },
    {
      name: "Diclofenac",
      brand: "Renata",
      description: "Reduces inflammation and pain",
      dosage: "50mg tablet",
    },
    {
      name: "Aspirin",
      brand: "Eskayef",
      description: "Pain relief and antiplatelet",
      dosage: "75mg tablet",
    },
    {
      name: "Naproxen",
      brand: "ACI Limited",
      description: "Reduces inflammation and pain",
      dosage: "250mg tablet",
    },
  ],
  "Cold, Cough & Flu": [
    {
      name: "Dextromethorphan",
      brand: "Eskayef",
      description: "Cough suppressant",
      dosage: "Syrup 5ml",
    },
    {
      name: "Phenylephrine",
      brand: "Renata",
      description: "Decongestant for nasal blockage",
      dosage: "10mg tablet",
    },
    {
      name: "Cetirizine",
      brand: "ACI Limited",
      description: "Antihistamine for allergy",
      dosage: "10mg tablet",
    },
    {
      name: "Ambroxol",
      brand: "Beximco",
      description: "Expectorant for chest congestion",
      dosage: "30mg tablet",
    },
  ],
  "Digestive Health": [
    {
      name: "Omeprazole",
      brand: "ACI Pharma",
      description: "Reduces stomach acid",
      dosage: "20mg capsule",
    },
    {
      name: "Ranitidine",
      brand: "Renata",
      description: "Heartburn and ulcer relief",
      dosage: "150mg tablet",
    },
    {
      name: "Lactulose",
      brand: "Eskayef",
      description: "Laxative for constipation",
      dosage: "Syrup 15ml",
    },
    {
      name: "Metoclopramide",
      brand: "Beximco",
      description: "Relieves nausea and vomiting",
      dosage: "10mg tablet",
    },
  ],
  "Allergy & Sinus": [
    {
      name: "Loratadine",
      brand: "ACI Limited",
      description: "Relieves allergy symptoms",
      dosage: "10mg tablet",
    },
    {
      name: "Fexofenadine",
      brand: "Eskayef",
      description: "Antihistamine for seasonal allergy",
      dosage: "120mg tablet",
    },
    {
      name: "Montelukast",
      brand: "Renata",
      description: "Prevents allergy-induced asthma",
      dosage: "10mg tablet",
    },
    {
      name: "Fluticasone",
      brand: "ACI Pharma",
      description: "Nasal spray for allergy",
      dosage: "50mcg/spray",
    },
  ],
  "Vitamins & Supplements": [
    {
      name: "Vitamin C",
      brand: "Beximco",
      description: "Boosts immunity",
      dosage: "500mg tablet",
    },
    {
      name: "Multivitamin",
      brand: "Eskayef",
      description: "General health supplement",
      dosage: "Capsule",
    },
    {
      name: "Calcium",
      brand: "ACI Limited",
      description: "Supports bone health",
      dosage: "500mg tablet",
    },
    {
      name: "Vitamin D3",
      brand: "Renata",
      description: "Bone and muscle health",
      dosage: "1000 IU tablet",
    },
  ],
  "Diabetes Care": [
    {
      name: "Metformin",
      brand: "Beximco",
      description: "Controls blood sugar",
      dosage: "500mg tablet",
    },
    {
      name: "Glimepiride",
      brand: "Eskayef",
      description: "Stimulates insulin release",
      dosage: "2mg tablet",
    },
    {
      name: "Insulin Aspart",
      brand: "Renata",
      description: "Rapid-acting insulin",
      dosage: "10ml vial",
    },
    {
      name: "Sitagliptin",
      brand: "ACI Pharma",
      description: "Controls type 2 diabetes",
      dosage: "50mg tablet",
    },
  ],
  "Heart & Blood Pressure": [
    {
      name: "Amlodipine",
      brand: "Eskayef",
      description: "Treats hypertension",
      dosage: "5mg tablet",
    },
    {
      name: "Losartan",
      brand: "Renata",
      description: "Blood pressure control",
      dosage: "50mg tablet",
    },
    {
      name: "Atorvastatin",
      brand: "Beximco",
      description: "Lowers cholesterol",
      dosage: "10mg tablet",
    },
    {
      name: "Metoprolol",
      brand: "ACI Limited",
      description: "Treats heart conditions",
      dosage: "50mg tablet",
    },
  ],
  "Respiratory Care": [
    {
      name: "Salbutamol",
      brand: "Beximco",
      description: "Asthma and bronchospasm relief",
      dosage: "Inhaler 100mcg",
    },
    {
      name: "Budesonide",
      brand: "Renata",
      description: "Asthma inhaler steroid",
      dosage: "Inhaler 200mcg",
    },
    {
      name: "Montelukast",
      brand: "Eskayef",
      description: "Prevents asthma attacks",
      dosage: "10mg tablet",
    },
    {
      name: "Ipratropium",
      brand: "ACI Pharma",
      description: "Bronchodilator for COPD",
      dosage: "Inhaler 20mcg",
    },
  ],
  "Infection & Antibiotics": [
    {
      name: "Amoxicillin",
      brand: "Renata",
      description: "Broad-spectrum antibiotic",
      dosage: "500mg capsule",
    },
    {
      name: "Azithromycin",
      brand: "Beximco",
      description: "Treats bacterial infections",
      dosage: "250mg tablet",
    },
    {
      name: "Cefixime",
      brand: "Eskayef",
      description: "Antibiotic for respiratory infections",
      dosage: "200mg tablet",
    },
    {
      name: "Ciprofloxacin",
      brand: "ACI Limited",
      description: "Treats urinary tract infections",
      dosage: "500mg tablet",
    },
  ],
  "Skin & Hair Care": [
    {
      name: "Clindamycin Gel",
      brand: "Beximco",
      description: "Acne treatment",
      dosage: "1% gel",
    },
    {
      name: "Hydrocortisone Cream",
      brand: "Renata",
      description: "Eczema and inflammation relief",
      dosage: "1% cream",
    },
    {
      name: "Ketoconazole Shampoo",
      brand: "Eskayef",
      description: "Antifungal for scalp",
      dosage: "2% shampoo",
    },
    {
      name: "Minoxidil",
      brand: "ACI Pharma",
      description: "Hair regrowth treatment",
      dosage: "5% solution",
    },
  ],
  "Women’s Health": [
    {
      name: "Ethinylestradiol + Levonorgestrel",
      brand: "Beximco",
      description: "Oral contraceptive",
      dosage: "Tablet",
    },
    {
      name: "Iron Folic Acid",
      brand: "Renata",
      description: "Prevents anemia during pregnancy",
      dosage: "Tablet",
    },
    {
      name: "Clomiphene",
      brand: "Eskayef",
      description: "Fertility treatment",
      dosage: "50mg tablet",
    },
    {
      name: "Misoprostol",
      brand: "ACI Pharma",
      description: "Induces labor or abortion",
      dosage: "200mcg tablet",
    },
  ],
  "Baby & Child Care": [
    {
      name: "ORS",
      brand: "Renata",
      description: "Hydration for children",
      dosage: "100ml packet",
    },
    {
      name: "Infant Multivitamin",
      brand: "Beximco",
      description: "Supports child growth",
      dosage: "Drops",
    },
    {
      name: "Teething Gel",
      brand: "Eskayef",
      description: "Relieves teething pain",
      dosage: "5ml gel",
    },
    {
      name: "Paracetamol Infant",
      brand: "ACI Pharma",
      description: "Fever reducer for infants",
      dosage: "125mg syrup",
    },
  ],
  "Eye, Ear & Dental Care": [
    {
      name: "Artificial Tears",
      brand: "Beximco",
      description: "Relieves dry eyes",
      dosage: "Eye drops",
    },
    {
      name: "Chloramphenicol Eye Drops",
      brand: "Renata",
      description: "Treats eye infections",
      dosage: "0.5% drops",
    },
    {
      name: "Ear Wax Removal Drops",
      brand: "Eskayef",
      description: "Softens ear wax",
      dosage: "10ml drops",
    },
    {
      name: "Mouthwash Antiseptic",
      brand: "ACI Pharma",
      description: "Prevents oral infections",
      dosage: "100ml rinse",
    },
  ],
  "First Aid & Medical Supplies": [
    {
      name: "Bandage Roll",
      brand: "Beximco",
      description: "First aid bandage",
      dosage: "5cm roll",
    },
    {
      name: "Antiseptic Liquid",
      brand: "Renata",
      description: "Disinfects wounds",
      dosage: "100ml",
    },
    {
      name: "Thermometer Digital",
      brand: "Eskayef",
      description: "Measures body temperature",
      dosage: "1 unit",
    },
    {
      name: "Medical Mask Pack",
      brand: "ACI Pharma",
      description: "Protective face masks",
      dosage: "Pack of 10",
    },
  ],
  "Herbal & Alternative Medicine": [
    {
      name: "Ashwagandha Capsule",
      brand: "Beximco",
      description: "Supports stress relief",
      dosage: "500mg capsule",
    },
    {
      name: "Giloy Juice",
      brand: "Renata",
      description: "Boosts immunity",
      dosage: "100ml bottle",
    },
    {
      name: "Aloe Vera Gel",
      brand: "Eskayef",
      description: "Skin moisturizer",
      dosage: "50ml tube",
    },
    {
      name: "Tulsi Extract Capsule",
      brand: "ACI Pharma",
      description: "Supports respiratory health",
      dosage: "500mg capsule",
    },
  ],
};

// Utility functions
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPrice() {
  return parseFloat((getRandomInt(50, 500) + Math.random()).toFixed(2));
}

function getRandomStock() {
  return getRandomInt(20, 200);
}

function getRandomDates() {
  const manufactureDate = new Date();
  manufactureDate.setMonth(manufactureDate.getMonth() - getRandomInt(0, 12));
  const expireDate = new Date(manufactureDate);
  expireDate.setFullYear(expireDate.getFullYear() + getRandomInt(1, 3));
  return { manufactureDate, expireDate };
}

// Seed function
async function seedMedicines() {
  try {
    for (const categoryName of categories) {
      const category = await prisma.category.findUnique({
        where: { name: categoryName },
      });
      if (!category) continue;

      const meds = medicines[categoryName] || [];

      for (const med of meds) {
        const { manufactureDate, expireDate } = getRandomDates();

        await prisma.medicine.upsert({
          where: { name: med.name }, // unique by name
          update: {
            price: getRandomPrice(),
            stock: getRandomStock(),
            manufactureDate,
            expireDate,
            categoryId: category.id,
            description: med.description,
          },
          create: {
            name: med.name,
            description: med.description,
            dosage: med.dosage,
            manufacturer: med.brand,
            price: getRandomPrice(),
            stock: getRandomStock(),
            manufactureDate,
            expireDate,
            categoryId: category.id,
          },
        });
      }
    }

    console.log("✅ Bangladeshi medicines seeded successfully!");
  } catch (error) {
    console.error("❌ Failed to seed medicines:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedMedicines();
