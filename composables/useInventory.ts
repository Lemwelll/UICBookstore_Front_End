// fetch data from api and store in state
import axios from "axios";

// async function fetchData() {
//   let data;
//   try {
//     data = (await axios.get("http://localhost:8000/api/uniform/")).data;
//   } catch (error) {
//     return []
//   }

//   console.log(data);

//   return data;
// }


export default function useInventory() {
  // const inventoryItems = useState("inventoryItems", (): any => fetchData());
  const inventoryItems = useState("inventoryItems", (): TInventoryItem[] => [
    {
      id: Date.now() + 1,
      category: "uniform",
      name: "School Uniform(Women)",
      price: 500,
      stock: 10,
      size: "",
      image: "",
    },
    {
      id: Date.now() + 2,
      category: "uniform",
      name: "School Uniform(Man)",
      price: 1100,
      stock: 1000,
      size: "",
      image: "/Male_uniform.jpg",
    },
    {
      id: Date.now() + 3,
      category: "uniform",
      name: "PE Shirt",
      price: 550,
      stock: 1000,
      size: "",
      image: "/PE_uniform.jpg",
    },
    {
      id: Date.now() + 4,
      category: "uniform",
      name: "PE Pants",
      price: 450,
      stock: 1000,
      size: "",
      image: "/PEpants_uniform.jpg",
    },
    {
      id: Date.now() + 5,
      category: "book",
      name: "PBS 300 Pharmaceutical Microbiology and Parasitology",
      price: 450,
      stock: 1000,
      size: "",
      image: "/PBS 300 pharmaceutical microbiology and parasitology.jpg",
    },
    {
      id: Date.now() + 6,
      category: "book",
      name: "PBS100 Pharmaceutical Biochemistry",
      price: 450,
      stock: 1000,
      size: "",
      image: "/PBS100 pharmaceutical biochemistry.jpg",
    },
    {
      id: Date.now() + 6,
      category: "book",
      name: "PBS100 Pharmacy Botany with Taxinomy",
      price: 450,
      stock: 1000,
      size: "",
      image: "/PBS100 pharmacy botany with taxinomy.jpg",
    },
    {
      id: Date.now() + 6,
      category: "book",
      name: "PBSS02 Pharmacology II",
      price: 450,
      stock: 1000,
      size: "",
      image: "/PBSS02 pharmacology II.jpg",
    },
    {
      id: Date.now() + 6,
      category: "book",
      name: "PCH100 Pharmaceutical Inorganic Chemistry",
      price: 450,
      stock: 1000,
      size: "",
      image: "/PCH100 pharmaceutical inorganic chemistry.jpg",
    },
    {
      id: Date.now() + 7,
      category: "book",
      name: "PBSS02 Pharmacology II",
      price: 450,
      stock: 1000,
      size: "",
      image: "/PBSS02 pharmacology II.jpg",
    },
    {
      id: Date.now() + 8,
      category: "book",
      name: "PCH100 Pharmaceutical Inorganic Chemistry",
      price: 450,
      stock: 1000,
      size: "",
      image: "/PCH100 pharmaceutical inorganic chemistry.jpg",
    },
    {
      id: Date.now() + 8,
      category: "book",
      name: "PCR202 Dispensing 2",
      price: 450,
      stock: 1000,
      size: "",
      image: "/PCR202 dispensing 2.jpg",
    },
    {
      id: Date.now() + 8,
      category: "book",
      name: "PCT 100 Phar.dosage forms- DDS",
      price: 450,
      stock: 1000,
      size: "",
      image: "/PCT 100 phar.dosage forms- DDS.jpg",
    },
    {
      id: Date.now() + 8,
      category: "book",
      name: "PCT 200 Physical Pharmacy",
      price: 450,
      stock: 1000,
      size: "",
      image: "/PCT 200 physical phramacy.jpg",
    },
    {
      id: Date.now() + 8,
      category: "book",
      name: "Physical Manufacturing _ CGMP",
      price: 450,
      stock: 1000,
      size: "",
      image: "/physical manufacturing _ CGMP.jpg",
    },
    {
      id: Date.now() + 8,
      category: "book",
      name: "PPR200 Pharmaceutical Calculations and Techniques",
      price: 450,
      stock: 1000,
      size: "",
      image: "/PPR200 pharmaceutical calculations and techniques.png",
    },
    
  ]);

  const sizes = ref(["S" , "M", "L", "XL", "XXL", "XXXL"]);

  const categories = ref([
    { title: "All", value: "all" },
    { title: "Uniforms", value: "uniform" },
    { title: "Books", value: "book" },
  ]);
  const category = ref("all"); 

  const filterItems = computed(() => {
    if (category.value === "all") {
      return inventoryItems.value;
    }
    return inventoryItems.value.filter(
      (item: any) => item.category === category.value,
    );
  });

  return {
    inventoryItems,
    sizes,
    categories,
    filterItems,
    category,
  };
}
