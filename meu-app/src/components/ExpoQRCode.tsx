import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Platform, Image } from "react-native";

interface ExpoQRCodeProps {
  deepLink?: string;
}

export default function ExpoQRCode({ deepLink }: ExpoQRCodeProps) {
  const [qrValue, setQrValue] = useState<string>("");
  const [qrImageUrl, setQrImageUrl] = useState<string>("");

  useEffect(() => {
    if (Platform.OS === "web" && deepLink) {
      setQrValue(deepLink);
      // Gera URL de QR code usando serviço online
      const encodedValue = encodeURIComponent(deepLink);
      setQrImageUrl(
        `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodedValue}`
      );
    }
  }, [deepLink]);

  if (Platform.OS !== "web") {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>📱 Teste com Expo Go</Text>
        <Text style={styles.subtitle}>
          Escaneie o QR code abaixo com o Expo Go
        </Text>

        <View style={styles.qrContainer}>
          {qrImageUrl ? (
            <Image
              source={{ uri: qrImageUrl }}
              style={styles.qrImage}
            />
          ) : (
            <Text style={styles.instruction}>
              Gerando QR code...
            </Text>
          )}
        </View>

        <View style={styles.instructionBox}>
          <Text style={styles.instructionTitle}>📖 Como usar:</Text>
          <Text style={styles.instructionText}>
            1. Instale o app "Expo Go" na App Store ou Play Store
          </Text>
          <Text style={styles.instructionText}>
            2. Abra o Expo Go e escaneie este QR code
          </Text>
          <Text style={styles.instructionText}>
            3. Seu app será carregado em tempo real
          </Text>
        </View>

        <View style={styles.urlBox}>
          <Text style={styles.urlLabel}>URL do Projeto:</Text>
          <Text style={styles.url} selectable={true}>
            {qrValue || "Conectando..."}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    maxWidth: 500,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
    color: "#666",
  },
  qrContainer: {
    alignItems: "center",
    marginBottom: 24,
    padding: 16,
    backgroundColor: "#fafafa",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  qrImage: {
    width: 250,
    height: 250,
  },
  instruction: {
    color: "#999",
    fontSize: 14,
  },
  instructionBox: {
    backgroundColor: "#f0f7ff",
    borderLeftWidth: 4,
    borderLeftColor: "#0066ff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  instructionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#0066ff",
  },
  instructionText: {
    fontSize: 13,
    color: "#333",
    marginBottom: 6,
    lineHeight: 18,
  },
  urlBox: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  urlLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    marginBottom: 4,
  },
  url: {
    fontSize: 11,
    color: "#0066ff",
    fontFamily: "monospace",
    wordBreak: "break-all",
  },
});
