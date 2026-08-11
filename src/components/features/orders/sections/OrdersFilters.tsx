import SegmentedControl from '../../../ui/SegmentedControl';

type OrdersFiltersProps = {
  typeFilter: 'all' | 'dinein' | 'takeaway';
  onChange: (filter: 'all' | 'dinein' | 'takeaway') => void;
  allLabel: string;
  dineInLabel: string;
  takeawayLabel: string;
};

const OrdersFilters = ({ typeFilter, onChange, allLabel, dineInLabel, takeawayLabel }: OrdersFiltersProps) => (
  <SegmentedControl
    className="w-full"
    options={[
      { value: 'all', label: allLabel },
      { value: 'dinein', label: dineInLabel },
      { value: 'takeaway', label: takeawayLabel },
    ]}
    selectedValue={typeFilter}
    onChange={onChange}
  />
);

export default OrdersFilters;
