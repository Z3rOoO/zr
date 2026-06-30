import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";
import ExpoQRCode from "../components/ExpoQRCode";

export default function DevScreen() {
  const [localIp, setLocalIp] = useState<string>("localhost");
  const [deepLink, setDeepLink] = useState<string>("");

  useEffect(() => {
    // Em desenvolvimento na web, gera o link para Expo Go
    if (Platform.OS === "web") {
      // Você pode customizar o link aqui
      // Formato: exp://[seu-usuario-expo]/[seu-projeto]
      // ou exp://localhost:8081 para desenvolvimento local
      setDeepLink("exp://localhost:8081");
    }
  }, []);

  const handleCopyToClipboard = () => {
    if (navigator.clipboard && deepLink) {
      navigator.clipboard.writeText(deepLink);
      alert("Link copiado para a área de transferência!");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🚀 Meu App</Text>
        <Text style={styles.headerSubtitle}>Desenvolvimento & Testes</Text>
      </View>

      <View style={styles.content}>
        <ExpoQRCode deepLink={deepLink} />

        <View style={styles.devInfo}>
          <Text style={styles.sectionTitle}>ℹ️ Informações de Desenvolvimento</Text>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Plataforma:</Text>
            <Text style={styles.infoValue}>{Platform.OS}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Deep Link:</Text>
            <Text style={styles.infoValue} selectable={true}>
              {deepLink}
            </Text>
          </View>

          {Platform.OS === "web" && (
            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleCopyToClipboard}
            >
              <Text style={styles.buttonText}>Copiar Link</Text>
            </Pressable>
          )}

          <View style={styles.tipsBox}>
            <Text style={styles.tipsTitle}>💡 Dicas:</Text>
            <Text style={styles.tipItem}>
              • Certifique-se que o Expo está rodando localmente (npm start)
            </Text>
            <Text style={styles.tipItem}>
              • Use o Expo Go no seu dispositivo
            </Text>
            <Text style={styles.tipItem}>
              • Conecte no mesmo Wi-Fi para melhor performance
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    backgroundColor: "#0066ff",
    padding: 24,
    paddingTop: 32,
    alignItems: "center",
    color: "white",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#e6f0ff",
  },
  content: {
    padding: 20,
  },
  devInfo: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
  infoBox: {
    backgroundColor: "white",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#0066ff",
  },
  infoLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#0066ff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 12,
  },
  buttonPressed: {
    backgroundColor: "#0052cc",
    opacity: 0.8,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  tipsBox: {
    backgroundColor: "#fff3cd",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#ffc107",
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#856404",
    marginBottom: 8,
  },
  tipItem: {
    fontSize: 13,
    color: "#856404",
    marginBottom: 6,
    lineHeight: 18,
  },
});
