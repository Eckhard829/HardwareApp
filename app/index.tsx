import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const CATEGORIES = [
  "All",
  "Timber",
  "Screws",
  "Plumbing",
  "Electrical",
  "Paint",
  "Tools",
];

const STORES = [
  {
    id: "1",
    name: "Bob's Hardware",
    address: "12 Main St, Cape Town",
    rating: 4.5,
    deliveryTime: "25-35 min",
    deliveryFee: "R25",
    image: "🔧",
  },
  {
    id: "2",
    name: "BuildIt Express",
    address: "45 Church St, Centurion",
    rating: 4.2,
    deliveryTime: "30-45 min",
    deliveryFee: "R30",
    image: "🏗️",
  },
  {
    id: "3",
    name: "Tool Masters",
    address: "8 Paul Kruger St, Bloemfontein",
    rating: 4.8,
    deliveryTime: "20-30 min",
    deliveryFee: "R20",
    image: "🛠️",
  },
  {
    id: "4",
    name: "Nuts & Bolts Co",
    address: "22 Voortrekker Rd, Centurion",
    rating: 4.0,
    deliveryTime: "35-50 min",
    deliveryFee: "R35",
    image: "⚙️",
  },
  {
    id: "5",
    name: "Plumbing Plus",
    address: "5 Boom St, Pretoria",
    rating: 4.6,
    deliveryTime: "25-40 min",
    deliveryFee: "R25",
    image: "🔩",
  },
  {
    id: "6",
    name: "Steel & More",
    address: "14 Bird St, Port Elizabeth",
    rating: 4.3,
    deliveryTime: "30-40 min",
    deliveryFee: "R28",
    image: "🏠",
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredStores = STORES.filter((store) =>
    store.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.locationLabel}>Deliver to</Text>
        <Text style={styles.locationValue}>📍 South Africa</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search stores..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryBtn,
                selectedCategory === cat && styles.categoryBtnActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Nearby Stores</Text>

        {filteredStores.map((store) => (
          <TouchableOpacity
            key={store.id}
            style={styles.storeCard}
            onPress={() =>
              router.push({
                pathname: "/store",
                params: {
                  id: store.id,
                  name: store.name,
                  emoji: store.image,
                  rating: store.rating,
                  deliveryTime: store.deliveryTime,
                  deliveryFee: store.deliveryFee,
                },
              })
            }
          >
            <View style={styles.storeImagePlaceholder}>
              <Text style={styles.storeEmoji}>{store.image}</Text>
            </View>
            <View style={styles.storeInfo}>
              <Text style={styles.storeName}>{store.name}</Text>
              <Text style={styles.storeAddress}>{store.address}</Text>
              <View style={styles.storeMetaRow}>
                <Text style={styles.storeMeta}>⭐ {store.rating}</Text>
                <Text style={styles.storeMeta}>🕐 {store.deliveryTime}</Text>
                <Text style={styles.storeMeta}>🚚 {store.deliveryFee}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0a1a" },
  header: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 10 },
  locationLabel: { color: "#888", fontSize: 12 },
  locationValue: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  searchContainer: { paddingHorizontal: 20, paddingVertical: 10 },
  searchInput: {
    backgroundColor: "#1a1a2e",
    color: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#0d2b6b",
  },
  categoriesContainer: { paddingLeft: 20, marginVertical: 10 },
  categoryBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#1a1a2e",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#0d2b6b",
  },
  categoryBtnActive: { backgroundColor: "#0d2b6b" },
  categoryText: { color: "#888", fontSize: 13 },
  categoryTextActive: { color: "#fff", fontWeight: "bold" },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  storeCard: {
    backgroundColor: "#1a1a2e",
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#0d2b6b",
  },
  storeImagePlaceholder: {
    height: 120,
    backgroundColor: "#0d2b6b",
    alignItems: "center",
    justifyContent: "center",
  },
  storeEmoji: { fontSize: 50 },
  storeInfo: { padding: 14 },
  storeName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  storeAddress: { color: "#888", fontSize: 13, marginBottom: 8 },
  storeMetaRow: { flexDirection: "row", gap: 12 },
  storeMeta: { color: "#aaa", fontSize: 12 },
});
