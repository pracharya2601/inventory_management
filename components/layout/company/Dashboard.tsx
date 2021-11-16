import Button from '@/components/elements/Button';
import SideBoard from '@/components/layout/sideboard';

interface DashboardProps {
    businessHeading?: JSX.Element;
    children?: JSX.Element;
}

const Dashboard = ({ businessHeading, children }: DashboardProps) => {
    return (
        <div className="bg-gray-200 dark:bg-gray-900 min-h-full pt-10">
            {businessHeading}
            <div>{children}</div>
            <SideBoard label="Open">
                <Button label="Button" />
            </SideBoard>
            <SideBoard label="New Open" />
        </div>
    );
};

export default Dashboard;
