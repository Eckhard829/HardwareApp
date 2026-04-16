import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const DUMMY_CART = [
  { id: "1", name: "Pine Plank 2.4m", price: 89.99, quantity: 2, emoji: "🪵" },
  { id: "2", name: "M8 Bolt Pack (50)", price: 45.0, quantity: 1, emoji: "🔩" },
  { id: "3", name: "PVC Pipe 1m", price: 28.5, quantity: 3, emoji: "🚿" },
];

export default function CartScreen() {
  const router = useRouter();
  const [cart, setCart] = useState(DUMMY_CART);

  const removeItem = (id: string) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id: string, change: number) => {
    setCart((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          const newQty = i.quantity + change;
          if (newQty < 1) return i;
          return { ...i, quantity: newQty };
        }
        return i;
      }),
    );
  };

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryFee = 25;
  const total = subtotal + deliveryFee;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Cart</Text>
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {cart.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <View style={styles.itemEmoji}>
              <Text style={styles.itemEmojiText}>{item.emoji}</Text>
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>
                R{(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
            <View style={styles.qtyControl}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => updateQty(item.id, -1)}
              >
                <Text style={styles.qtyBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyCount}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => updateQty(item.id, 1)}
              >
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => removeItem(item.id)}
              style={styles.removeBtn}
            >
              <Text style={styles.removeBtnText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>R{subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>R{deliveryFee.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>R{total.toFixed(2)}</Text>
          </View>
        </View>
        <View style={{ height: 120 }} />
      </ScrollView>

      <TouchableOpacity
        style={styles.checkoutBtn}
        onPress={() => router.push("/checkout")}
      >
        <Text style={styles.checkoutBtnText}>
          Proceed to Checkout • R{total.toFixed(2)}
        </Text>
      </TouchableOpacity>
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
  backBtn: { marginBottom: 8 },
  backText: { color: "#4a90e2", fontSize: 15 },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  list: { flex: 1, paddingHorizontal: 20, paddingTop: 16 },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#0d2b6b",
  },
  itemEmoji: {
    width: 44,
    height: 44,
    backgroundColor: "#0d2b6b",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  itemEmojiText: { fontSize: 22 },
  itemInfo: { flex: 1 },
  itemName: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 4,
  },
  itemPrice: { color: "#4a90e2", fontSize: 14, fontWeight: "bold" },
  qtyControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginRight: 10,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    backgroundColor: "#0d2b6b",
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  qtyCount: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    minWidth: 18,
    textAlign: "center",
  },
  removeBtn: { padding: 4 },
  removeBtnText: { fontSize: 18 },
  summaryCard: {
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#0d2b6b",
  },
  summaryTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: { color: "#888", fontSize: 14 },
  summaryValue: { color: "#fff", fontSize: 14 },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#0d2b6b",
    paddingTop: 10,
    marginTop: 4,
  },
  totalLabel: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  totalValue: { color: "#4a90e2", fontSize: 16, fontWeight: "bold" },
  checkoutBtn: {
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
  checkoutBtnText: { color: "#fff", fontSize: 15, fontWeight: "bold" },
});
