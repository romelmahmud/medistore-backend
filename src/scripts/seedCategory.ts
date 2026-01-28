import { prisma } from "../lib/prisma";

const categories = [
  {
    name: "Pain Relief & Fever",
    description: "Paracetamol, ibuprofen, and diclofenac for pain and fever.",
  },
  {
    name: "Cold, Cough & Flu",
    description: "Syrups, tablets, and sprays for cold, cough, and flu.",
  },
  {
    name: "Digestive Health",
    description:
      "Medicines for acidity, constipation, diarrhea, and stomach infections.",
  },
  {
    name: "Allergy & Sinus",
    description: "Antihistamines, nasal sprays, and allergy medications.",
  },
  {
    name: "Vitamins & Supplements",
    description:
      "Multivitamins, iron, calcium, omega-3, and herbal supplements.",
  },
  {
    name: "Diabetes Care",
    description:
      "Oral hypoglycemics, insulin, and glucose monitoring supplies.",
  },
  {
    name: "Heart & Blood Pressure",
    description:
      "Medicines for hypertension, cholesterol, and cardiovascular health.",
  },
  {
    name: "Respiratory Care",
    description: "Asthma inhalers, bronchodilator, and cough syrups.",
  },
  {
    name: "Infection & Antibiotics",
    description:
      "Antibiotics, antivirals, antifungals, and antiparasitic medicines.",
  },
  {
    name: "Skin & Hair Care",
    description:
      "Acne creams, eczema ointments, antifungal lotions, and hair fall treatments.",
  },
  {
    name: "Women’s Health",
    description:
      "Hormonal therapy, menstrual pain relief, fertility medicines, prenatal supplements.",
  },
  {
    name: "Baby & Child Care",
    description:
      "Infant formula, ORS, teething gels, and vitamins for children.",
  },
  {
    name: "Eye, Ear & Dental Care",
    description: "Eye drops, ear drops, dental gels, and antiseptic mouthwash.",
  },
  {
    name: "First Aid & Medical Supplies",
    description:
      "Bandages, antiseptics, thermometers, masks, gloves, and monitors.",
  },
  {
    name: "Herbal & Alternative Medicine",
    description:
      "Ayurvedic, Unani, and homeopathic products for health support.",
  },
];

async function seedCategories() {
  try {
    for (const category of categories) {
      await prisma.category.create({ data: category });
    }
    console.log("✅ Categories seeded successfully!");
  } catch (error) {
    console.error("❌ Failed to seed categories:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCategories();
