import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const CATEGORIES = [
  "All",
  "Timber",
  "Screws & Bolts",
  "Plumbing",
  "Electrical",
  "Paint",
  "Tools",
];

const PRODUCTS = [
  {
    id: "1",
    name: "Pine Plank 2.4m",
    category: "Timber",
    price: 89.99,
    unit: "per plank",
    emoji: "🪵",
  },
  {
    id: "2",
    name: "Meranti Board 1.8m",
    category: "Timber",
    price: 120.0,
    unit: "per board",
    emoji: "🪵",
  },
  {
    id: "3",
    name: "M8 Bolt Pack (50)",
    category: "Screws & Bolts",
    price: 45.0,
    unit: "per pack",
    emoji: "🔩",
  },
  {
    id: "4",
    name: "Wood Screws 4x40 (100)",
    category: "Screws & Bolts",
    price: 32.0,
    unit: "per pack",
    emoji: "🔩",
  },
  {
    id: "5",
    name: "PVC Pipe 1m",
    category: "Plumbing",
    price: 28.5,
    unit: "per pipe",
    emoji: "🚿",
  },
  {
    id: "6",
    name: "Gate Valve 15mm",
    category: "Plumbing",
    price: 65.0,
    unit: "each",
    emoji: "🚿",
  },
  {
    id: "7",
    name: "Conduit Pipe 20mm",
    category: "Electrical",
    price: 18.0,
    unit: "per meter",
    emoji: "⚡",
  },
  {
    id: "8",
    name: "DB Board 8-way",
    category: "Electrical",
    price: 320.0,
    unit: "each",
    emoji: "⚡",
  },
  {
    id: "9",
    name: "Ceiling White 5L",
    category: "Paint",
    price: 185.0,
    unit: "per tin",
    emoji: "🎨",
  },
  {
    id: "10",
    name: "Hammer 500g",
    category: "Tools",
    price: 95.0,
    unit: "each",
    emoji: "🔨",
  },
  {
    id: "11",
    name: "Tape Measure 5m",
    category: "Tools",
    price: 55.0,
    unit: "each",
    emoji: "📏",
  },
];

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  emoji: string;
};

export default function StoreScreen() {
  const router = useRouter();
  const { name, emoji, rating, deliveryTime, deliveryFee } =
    useLocalSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);

  const filteredProducts =
    selectedCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const addToCart = (product: (typeof PRODUCTS)[0]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          emoji: product.emoji,
        },
      ];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === productId);
      if (existing && existing.quantity > 1) {
        return prev.map((i) =>
          i.id === productId ? { ...i, quantity: i.quantity - 1 } : i,
        );
      }
      return prev.filter((i) => i.id !== productId);
    });
  };

  const getQuantity = (productId: string) => {
    return cart.find((i) => i.id === productId)?.quantity || 0;
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.storeHeaderInfo}>
          <Text style={styles.storeEmoji}>{emoji}</Text>
          <Text style={styles.storeName}>{name}</Text>
          <Text style={styles.storeMeta}>
            ⭐ {rating} • 🕐 {deliveryTime} • 🚚 {deliveryFee} delivery
          </Text>
        </View>
      </View>

      {/* Categories */}
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

      {/* Products */}
      <ScrollView
        style={styles.productList}
        showsVerticalScrollIndicator={false}
      >
        {filteredProducts.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <View style={styles.productEmoji}>
              <Text style={styles.productEmojiText}>{product.emoji}</Text>
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productUnit}>{product.unit}</Text>
              <Text style={styles.productPrice}>
                R{product.price.toFixed(2)}
              </Text>
            </View>
            <View style={styles.quantityControl}>
              {getQuantity(product.id) > 0 ? (
                <>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => removeFromCart(product.id)}
                  >
                    <Text style={styles.qtyBtnText}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyCount}>{getQuantity(product.id)}</Text>
                </>
              ) : null}
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => addToCart(product)}
              >
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Cart Button */}
      {cartCount > 0 && (
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => router.push("/store")}
        >
          <Text style={styles.cartButtonText}>
            🛒 {cartCount} items • View Cart • R{cartTotal.toFixed(2)}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0a1a" },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: "#1a1a2e",
    borderBottomWidth: 1,
    borderBottomColor: "#0d2b6b",
  },
  backBtn: { marginBottom: 12 },
  backText: { color: "#4a90e2", fontSize: 15 },
  storeHeaderInfo: { alignItems: "center" },
  storeEmoji: { fontSize: 40, marginBottom: 6 },
  storeName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  storeMeta: { color: "#888", fontSize: 13 },
  categoriesContainer: { paddingLeft: 20, marginVertical: 12, maxHeight: 50 },
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
  productList: { flex: 1, paddingHorizontal: 20 },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#0d2b6b",
  },
  productEmoji: {
    width: 50,
    height: 50,
    backgroundColor: "#0d2b6b",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  productEmojiText: { fontSize: 24 },
  productInfo: { flex: 1 },
  productName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  productUnit: { color: "#888", fontSize: 12, marginBottom: 4 },
  productPrice: { color: "#4a90e2", fontSize: 15, fontWeight: "bold" },
  quantityControl: { flexDirection: "row", alignItems: "center", gap: 8 },
  qtyBtn: {
    width: 30,
    height: 30,
    backgroundColor: "#0d2b6b",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtnText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  qtyCount: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    minWidth: 20,
    textAlign: "center",
  },
  cartButton: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "#0d2b6b",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4a90e2",
  },
  cartButtonText: { color: "#fff", fontSize: 15, fontWeight: "bold" },
});
