import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Card } from "@/components/ui/card";
import { useNavigation } from "expo-router";

export default function StepsDetailScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Day");
  const [currentDate, setCurrentDate] = useState(new Date());
  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, 
    });
  }, [navigation]);


  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };


  const goToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1); 
  };

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(26, 188, 156, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: "#199A8E",
    },
  };

  const data = {
    labels: ["6AM", "9AM", "12PM", "3PM", "6PM", "9PM"],
    datasets: [
      {
        data: [0, 1200, 2400, 3600, 2400, 1200],
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headText}>Steps details</Text>
      </View>

      <View style={styles.tabBarContainer}>
        <View style={styles.tabBar}>
          {["Day", "Week", "Month"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => handleTabPress(tab)}
              style={[
                styles.tab,
                activeTab === tab ? styles.activeTab : styles.inactiveTab,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab ? styles.activeTabText : styles.inactiveTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.header}>
        <TouchableOpacity onPress={goToPreviousDay}>
          <Text style={styles.arrow}>{`<`}</Text>
        </TouchableOpacity>
        <View style={styles.timesteps}>
        <Text style={styles.dateText}>{formatDate(currentDate)}</Text>
        <Text style={styles.stepsText}>2,420 Steps</Text>
      </View>
        <TouchableOpacity onPress={goToNextDay}>
          <Text style={styles.arrow}>{`>`}</Text>
        </TouchableOpacity>
      
      </View>

      <LineChart
        data={data}
        width={350}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />

      <View style={styles.cardsContainer}>
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Keep it up</Text>
          <Text>Your steps score is above average</Text>
          <View style={styles.cardStatsRow}>
            <View>
              <Text style={styles.statLabel}>Total Steps</Text>
              <Text style={styles.statValue}>3,200</Text>
            </View>
            <View>
              <Text style={styles.statLabel}>Daily Goal</Text>
              <Text style={styles.statValue}>5,800</Text>
            </View>
            <View>
              <Text style={styles.statLabel}>Average Steps</Text>
              <Text style={styles.statValue}>5,950</Text>
            </View>
          </View>
        </Card>

        <View style={styles.smallCardsRow}>
          <Card style={styles.smallCard}>
            <Text style={styles.statLabel}>Calories</Text>
            <Text style={styles.statValue}>170 kcal</Text>
          </Card>

          <Card style={styles.smallCard}>
            <Text style={styles.statLabel}>Calories</Text>
            <Text style={styles.statValue}>170 kcal</Text>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  tabBarContainer: {
    backgroundColor: "#F9FAFB", 
    paddingVertical: 8, 
    borderRadius: 20, 
    marginBottom: 10,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "white",
  },
  inactiveTab: {
    backgroundColor: "#F9FAFB",
  },
  tabText: {
    fontSize: 14,
  },
  activeTabText: {
    color: "#199A8E",
  },
  inactiveTabText: {
    color: "#A1A8B0",
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  timesteps: {
    flex: 1,
    alignItems: "center",
  },

  dateText: {
    fontSize: 16,
  },
  headText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  stepsText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#020B1A",
  },
  chart: {
    borderRadius: 16,
    alignSelf: "center",
  },
  cardsContainer: {
    marginTop: 16,
  },
  card: {
    marginBottom: 16,
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  statLabel: {
    fontSize: 12,
    color: "#777",
  },
  statValue: {
    fontSize: 25,
    fontWeight: "bold",
  },
  smallCardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  smallCard: {
    flex: 1,
    padding: 16,
  },
  marginRight: {
    marginRight: 8,
  },
  arrow: {
    fontSize: 24,
    color: "#555555",
    marginHorizontal: 16, 
  },
});