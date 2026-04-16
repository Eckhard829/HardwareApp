import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function OrderConfirmedScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>✅</Text>
        <Text style={styles.title}>Order Placed!</Text>
        <Text style={styles.subtitle}>
          Your order has been received and is being prepared for delivery.
        </Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Order Details</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Order Number</Text>
            <Text style={styles.infoValue}>#HW-00142</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Estimated Delivery</Text>
            <Text style={styles.infoValue}>30-45 min</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Payment</Text>
            <Text style={styles.infoValue}>Credit Card</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Total Paid</Text>
            <Text style={styles.infoValue}>R278.49</Text>
          </View>
        </View>

        <View style={styles.stepsCard}>
          <Text style={styles.infoTitle}>What happens next?</Text>
          <Text style={styles.step}>📦 Store is packing your order</Text>
          <Text style={styles.step}>🚚 Driver will pick it up shortly</Text>
          <Text style={styles.step}>
            📍 You will be notified when on the way
          </Text>
          <Text style={styles.step}>🔔 Driver will call when arriving</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.trackBtn}
        onPress={() => router.push("/tracking")}
      >
        <Text style={styles.trackBtnText}>Track My Order</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.homeBtn} onPress={() => router.push("/")}>
        <Text style={styles.homeBtnText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0a1a", paddingHorizontal: 20 },
  content: { flex: 1, paddingTop: 80 },
  emoji: { fontSize: 60, textAlign: "center", marginBottom: 16 },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: "#888",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  infoCard: {
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#0d2b6b",
  },
  infoTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoLabel: { color: "#888", fontSize: 13 },
  infoValue: { color: "#fff", fontSize: 13, fontWeight: "bold" },
  stepsCard: {
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#0d2b6b",
  },
  step: { color: "#aaa", fontSize: 13, marginBottom: 10, lineHeight: 20 },
  trackBtn: {
    backgroundColor: "#0d2b6b",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#4a90e2",
  },
  trackBtnText: { color: "#fff", fontSize: 15, fontWeight: "bold" },
  homeBtn: {
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#0d2b6b",
  },
  homeBtnText: { color: "#888", fontSize: 15 },
});
