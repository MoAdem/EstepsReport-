import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Card } from "@/components/ui/card";
import { useNavigation } from "expo-router";
import { StatusBar } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import EDSSCard from "@/components/ui/EDSSCard";
import { Button ,} from "react-native-paper";
import {Alert, Share} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';



export default function StepsDetailScreen() {
  const navigation = useNavigation();
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Hello this is my eSteps report section for today',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          
        } else {
          
        }
      } else if (result.action === Share.dismissedAction) {
        
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
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
    setCurrentDate(newDate);
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
    <>
    <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
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
        <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="arrow-upward" size={20} color="white" />
        </View>
        <View>
          <Text style={styles.cardTitle}>Keep it up</Text>
          <Text style={styles.statLabel}>Your steps score is above average</Text>
        </View>
      </View>
          <View style={styles.cardStatsRow}>
            <View>
              <Text style={styles.statLabel}>Total Steps</Text>
              <Text style={styles.statValue}>3,200</Text>
            </View>
            <View>
              <Text style={styles.statLabel}>Daily Goal</Text>
              <Text style={styles.statValueG}>5,800</Text>
            </View>
            <View>
              <Text style={styles.statLabel}>Average Steps</Text>
              <Text style={styles.statValueG}>5,950</Text>
            </View>
          </View>
        </Card>

        <View style={styles.smallCardsRow}>
          <Card style={styles.smallCard} >
            <Text style={styles.statLabel}>Distance</Text>
            <View style={styles.cardStatsRow2}> 
              <Text style={styles.statValue}>1.2</Text>
              <Text style={styles.statLabel2}>km</Text>
            </View>
          </Card>

          <Card style={styles.smallCard}>
            <Text style={styles.dateText}>Calories</Text>
            <View style={styles.cardStatsRow2}> 
              <Text style={styles.statValue}>170</Text>
              <Text style={styles.statLabel2}>kcal</Text>
            </View>
          </Card>
        </View>
        <View style={styles.cardsContainer}>
  {/*  Cadence Card */}
  <Card style={styles.cadenceCard}>
  <View style={styles.cardCadence}>
    <Text style={styles.cardTitle}>Cadence</Text>
    <Text style={styles.statSteps}>Steps/min</Text>
    </View>
    <View>
      <LineChart
        data={{
          labels: ["00:00", "06:00", "12:00", "18:00", "00:00"],
          datasets: [
            {
              data: [0, 50, 100, 150, 200],
            },
          ],
        }}
        width={350}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          color: (opacity = 1) => `rgba(26, 188, 156, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#199A8E",
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  </Card>
  {/*  step time Card */}
  <Card style={styles.cadenceCard}>
  <View style={styles.cardCadence}>
    <Text style={styles.cardTitle}>Step Time</Text>
    <Text style={styles.statSteps}>Seconds</Text>
    </View>
    <View>
      <LineChart
         data={{
          labels: ["00:00", "06:00", "12:00", "18:00", "00:00"],
          datasets: [
            {
              data: [0, 50, 10, 150, 200],
            },
          ],
        }}
        width={350}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          color: (opacity = 1) => `rgba(26, 188, 156, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#199A8E",
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  </Card>
  {/*  Swing Card */}
  <Card style={styles.cadenceCard}>
  <View style={styles.cardCadence}>
    <Text style={styles.cardTitle}>Swing</Text>
    <Text style={styles.statSteps}>Seconds</Text>
    </View>
    <View>
      <LineChart
         data={{
          labels: ["00:00", "06:00", "12:00", "18:00", "00:00"],
          datasets: [
            {
              data: [0, 0, 0, 150, 200],
            },
          ],
        }}
        width={350}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          color: (opacity = 1) => `rgba(26, 188, 156, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#199A8E",
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  </Card>
   {/*  Stance Card */}
   <Card style={styles.cadenceCard}>
  <View style={styles.cardCadence}>
    <Text style={styles.cardTitle}>Stance</Text>
    <Text style={styles.statSteps}>Seconds</Text>
    </View>
    <View>
      <LineChart
         data={{
          labels: ["00:00", "06:00", "12:00", "18:00", "00:00"],
          datasets: [
            {
              data: [0, 40, 60, 150, 200],
            },
          ],
        }}
        width={350}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          color: (opacity = 1) => `rgba(26, 188, 156, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#199A8E",
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  </Card>
</View>

<Card style={styles.angleCard}>
  <View style={styles.angleHeader}>
    <View style={styles.angleColumn}>
      <Text style={styles.angleTitle}>Toe Off Angle</Text>
      <View style={styles.angleImagePlaceholder}>
        {/* Add an image or icon here if available */}
      </View>
    </View>
    <View style={styles.angleColumn}>
      <Text style={styles.angleTitle}>Heel Contact Angle</Text>
      <View style={styles.angleImagePlaceholder}>
        {/* Add an image or icon here if available */}
      </View>
    </View>
  </View>

  <View style={styles.angleDataContainer}>
    {/* Left Foot Stats */}
    <View style={styles.angleDataSection}>
      <Text style={styles.dataHeader}>Left Foot</Text>
      <Text style={styles.dataLabel}>Average</Text>
      <Text style={styles.dataValue}>39.86°</Text>
      <Text style={styles.dataLabel}>Maximum</Text>
      <Text style={styles.dataValue}>48.15° (+ 3.66°)</Text>
      <Text style={styles.dataLabel}>Minimum</Text>
      <Text style={styles.dataValue}>48.15° (+ 8.69°)</Text>
      
    </View>

    {/* Divider Line */}
    <View style={styles.divider} />

    {/* Right Foot Stats */}
    <View style={styles.angleDataSection}>
      <Text style={styles.dataHeader}>Right Foot</Text>
      <Text style={styles.dataLabel}>Average</Text>
      <Text style={styles.dataValue}>39.86°</Text>
      <Text style={styles.dataLabel}>Maximum</Text>
      <Text style={styles.dataValue}>48.15° (+ 3.66°)</Text>
      <Text style={styles.dataLabel}>Minimum</Text>
      <Text style={styles.dataValue}>48.15° (+ 8.69°)</Text>
    </View>
  </View>
</Card>
<View style={styles.newcard}>
      <View style={styles.newheader}>
        <Text style={styles.title}>Physical & Mental Stress</Text>
        <MaterialIcons name="info" style={styles.infoIcon} />
      </View>

      {/* Line Chart */}
      <LineChart
        data={{
          labels: ["00:00", "06:00", "12:00", "18:00", "00:00"],
          datasets: [
            {
              data: [100, 40, 50, 30, 40 ,0],
              color: (opacity = 1) => `rgba(0, 128, 255, ${opacity})`,
              strokeWidth: 2,
            },
            {
              data: [70, 60, 30, 50, 40],
              color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
              strokeWidth: 2,
              
            },
          ],
        }}
        width={350} 
        height={220}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 8,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 8,
        }}
      />

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendIcon, { backgroundColor: "#0080FF" }]} />
          <Text style={styles.legendText}>Physical Stress</Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[
              styles.legendIcon,
              { backgroundColor: "#FFA500", borderStyle: "dashed" },
            ]}
          />
          <Text style={styles.legendText}>Mental Stress</Text>
        </View>
      </View>
    </View>

    <EDSSCard /> 
    <SafeAreaProvider>
      <SafeAreaView>
      <Button onPress={onShare} mode="contained" style={styles.shareButton}>
      <Text style={styles.shareButtonText}>Share</Text>
    </Button>
      </SafeAreaView>
    </SafeAreaProvider> 
    
       
  </View>
  
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  shareButton: {
    marginVertical: 16,
    paddingVertical: 8,
    marginBottom : 30,
    borderRadius: 10,
    backgroundColor: "#3AB09E",
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
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
  cardStatsRow2: {
    flexDirection: "row",
    marginTop: 16,
  },
  cardCadence: {
    flexDirection: "row",
    alignContent: "center",
    marginBottom: 16,
  },
  statLabel: {
    
    fontSize: 14,
    color: "#777",
  },
  statSteps: {
    fontSize: 11,
    color: "#777",
    paddingTop: 7,
    paddingLeft: 6,
 
  },
  statLabel2: {
    fontSize: 14,
    color: "#777",
    paddingTop: 12,
    paddingLeft: 6,
  },
  statValue: {
    fontSize: 25,
    fontWeight: "bold",
  },
  statValueG: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#3AB09E",
  },
  smallCardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  smallCard: {
    margin: 3,
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
  cardHeader: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 16,
},
iconContainer: {
  width: 40,
  height: 40,
  borderRadius: 20, 
  backgroundColor: "#3AB09E", 
  justifyContent: "center",
  alignItems: "center",
  marginRight: 12, 
},
cadenceCard: {
  marginBottom: 16,
  padding: 16,
  borderRadius: 12,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 3,
},
angleCard: {
  padding: 16,
  marginBottom: 16,
  borderRadius: 12,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 3,
  backgroundColor: "#fff",
},
angleHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 16,
},
angleColumn: {
  alignItems: "center",
  flex: 1,
},
angleTitle: {
  fontSize: 14,
  fontWeight: "600",
  marginBottom: 8,
  color: "#333",
},
angleImagePlaceholder: {
  width: 50,
  height: 50,
  backgroundColor: "#E8F5F3",
  borderRadius: 25,

  
},
angleDataContainer: {
  paddingHorizontal: 8,
},
angleDataSection: {
  paddingVertical: 12,
  
},
divider: {
  height: 1,
  backgroundColor: "#E0E0E0", 
  marginVertical: 8,
},
dataHeader: {
  fontSize: 16,
  fontWeight: "600",
  marginBottom: 8,
  color: "#333",
},
dataLabel: {
  fontSize: 14,
  color: "#666",
},
dataValue: {
  fontSize: 14,
  fontWeight: "600",
  marginBottom: 8,
  color: "#333",
},
newcard: {
  backgroundColor: "#fff",
  borderRadius: 12,
  padding: 16,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
  marginBottom: 16,
},
newheader: {
  flexDirection: "row",

  alignItems: "center",
  marginBottom: 12,
},
title: {
  fontSize: 16,
  fontWeight: "600",
  color: "#333",
},
infoIcon: {
  marginLeft: 10,
  marginTop: 2,
  fontSize: 18,
  color: "#667085",
  
},
legend: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 12,
},
legendItem: {
  flexDirection: "row",
  alignItems: "center",
},
legendIcon: {
  width: 12,
  height: 12,
  borderRadius: 6,
  marginRight: 8,
},
legendText: {
  fontSize: 12,
  color: "#555",
},


});