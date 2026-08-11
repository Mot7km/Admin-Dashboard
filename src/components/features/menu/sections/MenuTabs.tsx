import Tabs from '../../../ui/Tabs';
import SegmentedControl from '../../../ui/SegmentedControl';
import { LayoutGrid, List, QrCode, Sliders, Smartphone, Star, Utensils } from 'lucide-react';

type TabKey = 'items' | 'sliders' | 'qr' | 'reviews' | 'simulator';

type MenuTabsProps = {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  itemLabel: string;
  slidersLabel: string;
  qrLabel: string;
  simulatorLabel: string;
  reviewsLabel: string;
  viewMode: 'grid' | 'table';
  onViewModeChange: (mode: 'grid' | 'table') => void;
  viewGridLabel: string;
  viewTableLabel: string;
};

const MenuTabs = ({
  activeTab,
  onTabChange,
  itemLabel,
  slidersLabel,
  qrLabel,
  simulatorLabel,
  reviewsLabel,
  viewMode,
  onViewModeChange,
  viewGridLabel,
  viewTableLabel,
}: MenuTabsProps) => {
  const tabMeta = [
    { key: 'items' as const, label: itemLabel, icon: Utensils },
    { key: 'sliders' as const, label: slidersLabel, icon: Sliders },
    { key: 'qr' as const, label: qrLabel, icon: QrCode },
    { key: 'simulator' as const, label: simulatorLabel, icon: Smartphone },
    { key: 'reviews' as const, label: reviewsLabel, icon: Star },
  ];

  return (
    <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2 gap-2">
      <Tabs items={tabMeta} activeKey={activeTab} onChange={onTabChange} className="flex-1" />

      {activeTab === 'items' && (
        <SegmentedControl
          options={[
            { value: 'grid', label: viewGridLabel, icon: <LayoutGrid className="h-3.5 w-3.5" /> },
            { value: 'table', label: viewTableLabel, icon: <List className="h-3.5 w-3.5" /> },
          ]}
          selectedValue={viewMode}
          onChange={onViewModeChange}
        />
      )}
    </div>
  );
};

export default MenuTabs;
