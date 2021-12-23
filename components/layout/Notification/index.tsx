import Button from '@/components/elements/Button';

const item = {
    danger: {
        label: 'Error',
        color: 'bg-red-500',
    },
    success: {
        label: 'Success',
        color: 'bg-green-500',
    },
    warning: {
        label: 'Warning',
        color: 'bg-yellow-500',
    },
    notification: {
        label: 'Notification',
        color: 'bg-blue-500',
    },
};

const FIXED_VAL = 100;

const Notification = ({
    type,
    value,
    index,
    onClick,
    clearAll,
    lastItem,
}: {
    type: 'danger' | 'success' | 'warning' | 'notification';
    value: string;
    index: number;
    onClick: () => void;
    clearAll?: () => void;
    lastItem: boolean;
}) => {
    return (
        <div
            className={`absolute top-0 w-64 right-0 mr-2 z-100 border text-gray-100 p-2 rounded justify-between items-center ${item[type].color}`}
            style={{ marginTop: index + 1 > 5 ? `${FIXED_VAL + index * 10}px` : `${(index + 1) * 30}px` }}
        >
            <div className="text-md w-full font-semibold flex justify-between">
                <span>{item[type].label} </span>{' '}
                <Button
                    icon={<span>X</span>}
                    size="xs"
                    color="red"
                    customClass="float-right"
                    onClick={() => onClick()}
                />
            </div>
            <div className="h-11 py-px overflow-hidden text-sm">{value}</div>
            {lastItem && (
                <Button
                    label={'Clear All'}
                    size="xs"
                    color="red"
                    fullwidth
                    customClass="float-right"
                    onClick={() => clearAll()}
                />
            )}
        </div>
    );
};

export default Notification;
