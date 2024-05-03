import { Text, View, StyleSheet } from 'react-native';

const DataCard = ({ icon, title, percentage, time }) => {
    return (
        <View style={[styles.card]}>
            {icon && <Image source={icon} style={styles.icon} />}
            <Text style={styles.percentage}>{percentage}%</Text>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.time}>{time} hrs now</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center', 
        width: "80%", 
        height: 100, 
        backgroundColor:"#504B4B",
        

    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    percentage: {
        fontSize: 28,
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