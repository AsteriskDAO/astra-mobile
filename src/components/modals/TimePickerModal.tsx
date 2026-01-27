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

interface TimePickerModalProps {
    visible: boolean;
    initialTime?: { hour: number; minute: number; ampm: 'AM' | 'PM' };
    onSave: (time: { hour: number; minute: number; ampm: 'AM' | 'PM' }) => void;
    onCancel: () => void;
    title?: string;
}

const TimePickerModal: React.FC<TimePickerModalProps> = ({
    visible,
    initialTime,
    onSave,
    onCancel,
    title = 'Select time',
}) => {
    const [selectedHour, setSelectedHour] = useState(initialTime?.hour || 12);
    const [selectedMinute, setSelectedMinute] = useState(initialTime?.minute || 0);
    const [selectedAmpm, setSelectedAmpm] = useState<'AM' | 'PM'>(initialTime?.ampm || 'AM');

    const hours = Array.from({ length: 12 }, (_, i) => i + 1);
    const minutes = Array.from({ length: 60 }, (_, i) => i);
    const ampmOptions: ('AM' | 'PM')[] = ['AM', 'PM'];

    const hourScrollRef = useRef<ScrollView>(null);
    const minuteScrollRef = useRef<ScrollView>(null);
    const ampmScrollRef = useRef<ScrollView>(null);

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
                scrollToItem(hourScrollRef, selectedHour - 1);
                scrollToItem(minuteScrollRef, selectedMinute);
                scrollToItem(ampmScrollRef, selectedAmpm === 'AM' ? 0 : 1);
            }, 100);
        }
    }, [visible]);

    const handleSave = () => {
        onSave({
            hour: selectedHour,
            minute: selectedMinute,
            ampm: selectedAmpm,
        });
    };

    const formatTime = (hour: number, minute: number, ampm: 'AM' | 'PM') => {
        const minuteStr = minute.toString().padStart(2, '0');
        return `${hour}:${minuteStr} ${ampm}`;
    };

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
                            hours,
                            selectedHour,
                            (value) => setSelectedHour(value as number),
                            hourScrollRef,
                            (item) => item ? item.toString().padStart(2, '0') : ''
                        )}

                        <Text style={styles.separator}>:</Text>

                        {renderPickerColumn(
                            minutes,
                            selectedMinute,
                            (value) => setSelectedMinute(value as number),
                            minuteScrollRef,
                            (item) => item ? item.toString().padStart(2, '0') : ''
                        )}

                        {renderPickerColumn(
                            ampmOptions,
                            selectedAmpm,
                            (value) => setSelectedAmpm(value as 'AM' | 'PM'),
                            ampmScrollRef
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

export default TimePickerModal;
