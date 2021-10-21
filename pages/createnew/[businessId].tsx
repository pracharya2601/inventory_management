import { GetServerSideProps } from 'next';
import { connectDb } from 'ssr/connectDb';
import { ssrPipe } from 'ssr/ssrPipe';
import { withSession } from 'ssr/withSession';
import { withUser } from 'ssr/withUser';

const CreateNew = (props) => {
    console.log(props);
    return (
        <div>
            <div>
                <div>This is Create New Page;</div>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = ssrPipe(withSession, connectDb, withUser);

export default CreateNew;
