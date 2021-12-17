import ComponentWrapper from '@/components/layout/ComponentWrapper';
import { getSession } from 'next-auth/client';
import jwt from 'jsonwebtoken';
import Button from '@/components/elements/Button';
import { useRouter } from 'next/router';
import { connectToDB } from 'db/connect';
import { getUnverifiedWorkplaces } from 'db/workplace';

const Verify = ({ data, error }: { data: Array<{ code: string; name: string }>; error: string }) => {
    const router = useRouter();
    return (
        <ComponentWrapper>
            <div className="h-full flex flex-col justify-center items-center">
                {!error && (
                    <div className="mb-3 px-3 text-center">
                        Click on the button to procced. You need the joining code to procced.
                    </div>
                )}
                {!error &&
                    data.map(({ name, code }) => (
                        <Button
                            label={`Join ${name}`}
                            key={code}
                            onClick={() => router.push(`/verify/${code}`)}
                            customClass="mb-2"
                        />
                    ))}
                {error && (
                    <div className="flex flex-col justify-center items-center">
                        <div className="text-center text-red-500">{error}</div>
                        <Button
                            label="Go to Home"
                            color="green"
                            size="sm"
                            onClick={() => router.push('/')}
                            customClass="w-60 mt-3"
                        />
                    </div>
                )}
            </div>
        </ComponentWrapper>
    );
};

export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    if (!session || !session.user) {
        return {
            redirect: {
                permanent: false,
                destination: `/signin?callbackUrl=${context.resolvedUrl}`,
            },
        };
    }
    const { db } = await connectToDB();
    const newData = await getUnverifiedWorkplaces(db, session?.user?.email as string);
    const secret = process.env.COMPANY_JWT_SECRET;
    const arrOfSendingData = newData.map((item) => ({
        name: item.workplaceName,
        code: jwt.sign(
            {
                _id: item._id,
                workplaceCode: item.workplaceCode,
                name: item.workplaceName,
                yourinfo: item.staffs.find((ii) => ii.email === session.user.email),
            },
            secret,
        ),
    }));
    return {
        props: {
            data: newData.length > 0 ? arrOfSendingData : [],
            error:
                newData.length === 0
                    ? 'No Business added your Info on their staff list. Please let them know before join.'
                    : '',
        },
    };
}

export default Verify;
