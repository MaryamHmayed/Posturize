import { Text, View, StyleSheet } from 'react-native';

const DataCard = ({ title, percentage, time }) => {
    return (
        
        <View style={[styles.card]}>
            <Text style={[styles.percentage,]}>{percentage}%</Text>
            <View style={styles.data}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.time}>{time} hrs now</Text>
            </View>
        </View>
    
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center', 
        width: "80%", 
        height: 70, 
        backgroundColor:"#504B4B",
        flexDirection:"row",
        gap:10
    },
    data:{
        flexDirection:"column"

    },

    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    percentage: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    time: {
        fontSize: 16,
        color: 'white',
    }
});

export default DataCard;