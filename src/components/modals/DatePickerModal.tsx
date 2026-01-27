import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from 'react-native';
import { theme } from '../../theme/theme';
import { FONT_SIZES } from '../../constants/fontSizes';

interface DatePickerModalProps {
    visible: boolean;
    initialDate?: Date;
    onSave: (date: Date) => void;
    onCancel: () => void;
    title?: string;
    minimumDate?: Date;
    maximumDate?: Date;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({
    visible,
    initialDate,
    onSave,
    onCancel,
    title = 'Select date',
    minimumDate,
    maximumDate,
}) => {
    const initial = initialDate || new Date();
    const [selectedMonth, setSelectedMonth] = useState(initial.getMonth() + 1);
    const [selectedDay, setSelectedDay] = useState(initial.getDate());
    const [selectedYear, setSelectedYear] = useState(initial.getFullYear());

    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - 50 + i);

    // Get days in selected month
    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month, 0).getDate();
    };

    const days = Array.from(
        { length: getDaysInMonth(selectedMonth, selectedYear) },
        (_, i) => i + 1
    );

    const monthScrollRef = useRef<ScrollView>(null);
    const dayScrollRef = useRef<ScrollView>(null);
    const yearScrollRef = useRef<ScrollView>(null);

    const ITEM_HEIGHT = 40;
    const VISIBLE_ITEMS = 3;

    const scrollToItem = (scrollViewRef: React.RefObject<ScrollView | null>, index: number) => {
        scrollViewRef.current?.scrollTo({
            y: index * ITEM_HEIGHT,
            animated: true,
        });
    };

    React.useEffect(() => {
        if (visible) {
            setTimeout(() => {
                scrollToItem(monthScrollRef, selectedMonth - 1);
                scrollToItem(dayScrollRef, selectedDay - 1);
                const yearIndex = years.findIndex((y) => y === selectedYear);
                if (yearIndex >= 0) {
                    scrollToItem(yearScrollRef, yearIndex);
                }
            }, 100);
        }
    }, [visible]);

    React.useEffect(() => {
        // Adjust day if it's invalid for the selected month
        const maxDays = getDaysInMonth(selectedMonth, selectedYear);
        if (selectedDay > maxDays) {
            setSelectedDay(maxDays);
        }
    }, [selectedMonth, selectedYear]);

    const handleSave = () => {
        const date = new Date(selectedYear, selectedMonth - 1, selectedDay);

        // Validate date range
        if (minimumDate && date < minimumDate) {
            return;
        }
        if (maximumDate && date > maximumDate) {
            return;
        }

        onSave(date);
    };

    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const renderPickerColumn = (
        items: (number | string)[],
        selectedValue: number | string,
        onSelect: (value: number | string) => void,
        scrollRef: React.RefObject<ScrollView | null>,
        formatItem?: (item: number | string) => string
    ) => {
        const paddingItems = Array(Math.floor(VISIBLE_ITEMS / 2)).fill(null);
        const allItems = [...paddingItems, ...items, ...paddingItems];

        return (
            <ScrollView
                ref={scrollRef}
                style={styles.pickerColumn}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                onMomentumScrollEnd={(event) => {
                    const y = event.nativeEvent.contentOffset.y;
                    const index = Math.round(y / ITEM_HEIGHT);
                    const actualIndex = index - Math.floor(VISIBLE_ITEMS / 2);
                    if (actualIndex >= 0 && actualIndex < items.length) {
                        onSelect(items[actualIndex]);
                    }
                }}
            >
                {allItems.map((item, index) => {
                    // Skip rendering padding items (null values)
                    if (item === null) {
                        return (
                            <View
                                key={index}
                                style={[
                                    styles.pickerItem,
                                    { height: ITEM_HEIGHT },
                                ]}
                            >
                                <Text style={styles.pickerItemText} />
                            </View>
                        );
                    }

                    const isSelected = item === selectedValue;
                    const displayValue = formatItem ? formatItem(item) : item?.toString() || '';

                    return (
                        <View
                            key={index}
                            style={[
                                styles.pickerItem,
                                { height: ITEM_HEIGHT },
                                isSelected && styles.pickerItemSelected,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.pickerItemText,
                                    isSelected && styles.pickerItemTextSelected,
                                    !isSelected && styles.pickerItemTextFaded,
                                ]}
                            >
                                {displayValue}
                            </Text>
                        </View>
                    );
                })}
            </ScrollView>
        );
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onCancel}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>{title}</Text>

                    <View style={styles.pickerContainer}>
                        {renderPickerColumn(
                            months,
                            selectedMonth,
                            (value) => setSelectedMonth(value as number),
                            monthScrollRef,
                            (item) => monthNames[(item as number) - 1]
                        )}

                        <Text style={styles.separator}>/</Text>

                        {renderPickerColumn(
                            days,
                            selectedDay,
                            (value) => setSelectedDay(value as number),
                            dayScrollRef,
                            (item) => item ? item.toString().padStart(2, '0') : ''
                        )}

                        <Text style={styles.separator}>/</Text>

                        {renderPickerColumn(
                            years,
                            selectedYear,
                            (value) => setSelectedYear(value as number),
                            yearScrollRef
                        )}
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={onCancel}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleSave}
                        >
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: theme.colors.background,
        borderRadius: 15,
        padding: 20,
        width: Dimensions.get('window').width * 0.85,
        maxWidth: 400,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    title: {
        ...theme.typography.presets.h3,
        color: theme.colors.textPrimary,
        textAlign: 'center',
        marginBottom: 20,
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
        marginVertical: 20,
        position: 'relative',
    },
    pickerColumn: {
        flex: 1,
        maxHeight: 120,
    },
    pickerItem: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 4,
    },
    pickerItemSelected: {
        backgroundColor: theme.colors.inputBackground,
        borderRadius: 8,
        marginHorizontal: 4,
        minHeight: 32,
    },
    pickerItemText: {
        fontSize: FONT_SIZES.h3,
        fontFamily: theme.typography.fontFamily.prompt,
        color: theme.colors.textPrimary,
    },
    pickerItemTextSelected: {
        fontWeight: theme.typography.fontWeight.medium,
    },
    pickerItemTextFaded: {
        opacity: 0.3,
    },
    separator: {
        fontSize: FONT_SIZES.h3,
        fontFamily: theme.typography.fontFamily.prompt,
        color: theme.colors.textPrimary,
        marginHorizontal: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: theme.spacing.base,
        marginTop: 10,
    },
    cancelButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    cancelButtonText: {
        ...theme.typography.presets.body,
        color: theme.colors.textPrimary,
    },
    saveButton: {
        backgroundColor: theme.colors.inputBackground,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    saveButtonText: {
        ...theme.typography.presets.body,
        color: theme.colors.textPrimary,
        fontWeight: theme.typography.fontWeight.medium,
    },
});

export default DatePickerModal;
