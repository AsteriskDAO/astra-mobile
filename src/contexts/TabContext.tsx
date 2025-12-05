import React, { createContext, useContext, useState, ReactNode } from 'react';

export type TabType = 'home' | 'community' | 'chat' | 'notifications' | 'settings';

interface TabContextType {
    activeTab: TabType;
    setActiveTab: (tab: TabType) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [activeTab, setActiveTab] = useState<TabType>('home');

    return (
        <TabContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </TabContext.Provider>
    );
};

export const useTab = () => {
    const context = useContext(TabContext);
    if (!context) {
        throw new Error('useTab must be used within TabProvider');
    }
    return context;
};

