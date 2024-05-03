import { Text, View, StyleSheet } from 'react-native';

const DataCard = ({ backgroundColor, icon, title, percentage, time }) => {
    return (
        <View style={[styles.card, { backgroundColor }]}>
            {icon && <Image source={icon} style={styles.icon} />}
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.percentage}>{percentage}%</Text>
            <Text style={styles.time}>{time} hrs now</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        padding: 15,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center', 
        width: 150, 
        height: 200 
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
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    time: {
        fontSize: 14,
        color: 'white',
    }
});

export default DataCard;