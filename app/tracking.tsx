import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const STEPS = [
  {
    id: 1,
    label: "Order Received",
    desc: "Your order has been confirmed",
    done: true,
    emoji: "✅",
  },
  {
    id: 2,
    label: "Packing",
    desc: "Store is packing your items",
    done: true,
    emoji: "📦",
  },
  {
    id: 3,
    label: "Driver Assigned",
    desc: "A driver is heading to the store",
    done: true,
    emoji: "🚗",
  },
  {
    id: 4,
    label: "Out for Delivery",
    desc: "Your order is on the way",
    done: false,
    emoji: "🚚",
  },
  {
    id: 5,
    label: "Delivered",
    desc: "Enjoy your order!",
    done: false,
    emoji: "🏠",
  },
];

export default function TrackingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Order</Text>
      </View>

      <View style={styles.orderInfo}>
        <Text style={styles.orderNumber}>Order #HW-00142</Text>
        <Text style={styles.eta}>Estimated arrival: 15-20 min</Text>
      </View>

      <View style={styles.driverCard}>
        <Text style={styles.driverEmoji}>🧑‍✈️</Text>
        <View style={styles.driverInfo}>
          <Text style={styles.driverName}>Sipho M.</Text>
          <Text style={styles.driverDetails}>Toyota Hilux • CA 123-456</Text>
        </View>
        <TouchableOpacity style={styles.callBtn}>
          <Text style={styles.callBtnText}>📞 Call</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.stepsContainer}>
        {STEPS.map((step, index) => (
          <View key={step.id} style={styles.stepRow}>
            <View style={styles.stepLeft}>
              <View style={[styles.stepDot, step.done && styles.stepDotDone]}>
                <Text style={styles.stepDotText}>{step.done ? "✓" : ""}</Text>
              </View>
              {index < STEPS.length - 1 && (
                <View
                  style={[styles.stepLine, step.done && styles.stepLineDone]}
                />
              )}
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepEmoji}>{step.emoji}</Text>
              <View>
                <Text
                  style={[styles.stepLabel, step.done && styles.stepLabelDone]}
                >
                  {step.label}
                </Text>
                <Text style={styles.stepDesc}>{step.desc}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.homeBtn} onPress={() => router.push("/")}>
        <Text style={styles.homeBtnText}>Back to Home</Text>
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
  orderInfo: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#0d2b6b",
  },
  orderNumber: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  eta: { color: "#4a90e2", fontSize: 14 },
  driverCard: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#0d2b6b",
  },
  driverEmoji: { fontSize: 36, marginRight: 12 },
  driverInfo: { flex: 1 },
  driverName: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 2,
  },
  driverDetails: { color: "#888", fontSize: 12 },
  callBtn: {
    backgroundColor: "#0d2b6b",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  callBtnText: { color: "#fff", fontSize: 13, fontWeight: "bold" },
  stepsContainer: { paddingHorizontal: 20 },
  stepRow: { flexDirection: "row", marginBottom: 0 },
  stepLeft: { alignItems: "center", marginRight: 14 },
  stepDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#1a1a2e",
    borderWidth: 2,
    borderColor: "#0d2b6b",
    alignItems: "center",
    justifyContent: "center",
  },
  stepDotDone: { backgroundColor: "#0d2b6b", borderColor: "#4a90e2" },
  stepDotText: { color: "#4a90e2", fontSize: 12, fontWeight: "bold" },
  stepLine: { width: 2, height: 40, backgroundColor: "#1a1a2e" },
  stepLineDone: { backgroundColor: "#0d2b6b" },
  stepContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingBottom: 24,
    gap: 10,
  },
  stepEmoji: { fontSize: 20, marginTop: 2 },
  stepLabel: {
    color: "#888",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  stepLabelDone: { color: "#fff" },
  stepDesc: { color: "#666", fontSize: 12 },
  homeBtn: {
    margin: 20,
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0d2b6b",
  },
  homeBtnText: { color: "#888", fontSize: 15 },
});
