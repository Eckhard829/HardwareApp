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

export default function CheckoutScreen() {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>

      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Delivery Details</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Johan van der Merwe"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 082 123 4567"
          placeholderTextColor="#888"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Delivery Address</Text>
        <TextInput
          style={[styles.input, styles.addressInput]}
          placeholder="e.g. 12 Main St, Pretoria, 0001"
          placeholderTextColor="#888"
          value={address}
          onChangeText={setAddress}
          multiline
        />

        <Text style={styles.sectionTitle}>Payment Method</Text>

        <TouchableOpacity
          style={[
            styles.paymentOption,
            paymentMethod === "card" && styles.paymentOptionActive,
          ]}
          onPress={() => setPaymentMethod("card")}
        >
          <Text style={styles.paymentEmoji}>💳</Text>
          <Text style={styles.paymentLabel}>Credit / Debit Card</Text>
          {paymentMethod === "card" && (
            <Text style={styles.selectedDot}>✓</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentOption,
            paymentMethod === "eft" && styles.paymentOptionActive,
          ]}
          onPress={() => setPaymentMethod("eft")}
        >
          <Text style={styles.paymentEmoji}>🏦</Text>
          <Text style={styles.paymentLabel}>EFT / Bank Transfer</Text>
          {paymentMethod === "eft" && <Text style={styles.selectedDot}>✓</Text>}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentOption,
            paymentMethod === "snapscan" && styles.paymentOptionActive,
          ]}
          onPress={() => setPaymentMethod("snapscan")}
        >
          <Text style={styles.paymentEmoji}>📱</Text>
          <Text style={styles.paymentLabel}>SnapScan</Text>
          {paymentMethod === "snapscan" && (
            <Text style={styles.selectedDot}>✓</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentOption,
            paymentMethod === "cash" && styles.paymentOptionActive,
          ]}
          onPress={() => setPaymentMethod("cash")}
        >
          <Text style={styles.paymentEmoji}>💵</Text>
          <Text style={styles.paymentLabel}>Cash on Delivery</Text>
          {paymentMethod === "cash" && (
            <Text style={styles.selectedDot}>✓</Text>
          )}
        </TouchableOpacity>

        <View style={styles.orderSummary}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>R253.49</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>R25.00</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>R278.49</Text>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      <TouchableOpacity
        style={styles.placeOrderBtn}
        onPress={() => router.push("/orderconfirmed")}
      >
        <Text style={styles.placeOrderBtnText}>Place Order • R278.49</Text>
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
  form: { flex: 1, paddingHorizontal: 20, paddingTop: 16 },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 8,
  },
  label: { color: "#888", fontSize: 13, marginBottom: 6 },
  input: {
    backgroundColor: "#1a1a2e",
    color: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#0d2b6b",
    marginBottom: 14,
  },
  addressInput: { height: 80, textAlignVertical: "top" },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#0d2b6b",
  },
  paymentOptionActive: { borderColor: "#4a90e2" },
  paymentEmoji: { fontSize: 22, marginRight: 12 },
  paymentLabel: { color: "#fff", fontSize: 14, flex: 1 },
  selectedDot: { color: "#4a90e2", fontSize: 16, fontWeight: "bold" },
  orderSummary: {
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#0d2b6b",
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
  placeOrderBtn: {
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
  placeOrderBtnText: { color: "#fff", fontSize: 15, fontWeight: "bold" },
});
