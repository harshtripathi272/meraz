// Pass data for Meraz 6.0
export interface Pass {
    id: string;
    title: string;
    subtitle: string;
    basePrice: number;
    benefits: string[];
    purchaseUrl: string;
    featured: boolean;
    groupDiscounts: {
        minSize: number;
        maxSize: number;
        pricePerPerson: number;
        label: string;
    }[];
}

export const passes: Pass[] = [
    {
        id: "student-pass",
        title: "Student Pass",
        subtitle: "The Complete Experience",
        basePrice: 500,
        benefits: [
            "Entry to all events across 3 days",
            "Access to Pro-Nights (concerts & celebrity performances)",
            "Priority seating at main events",
            "Exclusive Meraz merchandise kit",
            "Food court discounts",
            "Networking lounge access",
            "Certificate of participation"
        ],
        purchaseUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfdVhh3Q6OzyE30O9fRm_IIwoPyY_9eBbRDjkgtQ7wUNrX7LQ/viewform",
        featured: true,
        groupDiscounts: [
            { minSize: 3, maxSize: 6, pricePerPerson: 460, label: "Small Group (3-6)" },
            { minSize: 7, maxSize: 9, pricePerPerson: 430, label: "Medium Group (7-9)" },
            { minSize: 10, maxSize: 100, pricePerPerson: 400, label: "Large Group (10+)" }
        ]
    },
    {
        id: "access-pass-1day",
        title: "Access Pass",
        subtitle: "Single Day Entry",
        basePrice: 150,
        benefits: [
            "Campus entry for 1 day",
            "Access to all daytime events",
            "Food court access",
            "NO Pro-Night access"
        ],
        purchaseUrl: "https://docs.google.com/forms/d/e/1FAIpQLScybemGe99maALEORbUyXp0rlujs_4lPr2Kbwpny2Kd0yRhoA/viewform",
        featured: false,
        groupDiscounts: [
            { minSize: 3, maxSize: 5, pricePerPerson: 140, label: "Small Group (3-5)" },
            { minSize: 6, maxSize: 9, pricePerPerson: 120, label: "Medium Group (6-9)" },
            { minSize: 10, maxSize: 100, pricePerPerson: 100, label: "Large Group (10+)" }
        ]
    },
    {
        id: "access-pass-2day",
        title: "Access Pass",
        subtitle: "Two Day Entry",
        basePrice: 200,
        benefits: [
            "Campus entry for 2 days",
            "Access to all daytime events",
            "Food court access",
            "Meraz sticker pack",
            "NO Pro-Night access"
        ],
        purchaseUrl: "https://docs.google.com/forms/d/e/1FAIpQLScybemGe99maALEORbUyXp0rlujs_4lPr2Kbwpny2Kd0yRhoA/viewform",
        featured: false,
        groupDiscounts: [
            { minSize: 3, maxSize: 5, pricePerPerson: 180, label: "Small Group (3-5)" },
            { minSize: 6, maxSize: 9, pricePerPerson: 160, label: "Medium Group (6-9)" },
            { minSize: 10, maxSize: 100, pricePerPerson: 150, label: "Large Group (10+)" }
        ]
    }
];
