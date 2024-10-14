// Spinner.js
import { ClipLoader } from 'react-spinners';
import { useAtom } from 'jotai';
import { loadingAtom } from '../jotai/loader.jotai';

const Spinner = () => {
    const [loading] = useAtom(loadingAtom);

    return (
        <div>
            {loading && (
                <div className="spinner-overlay">
                    <ClipLoader size={50} color={"#36D7B7"} loading={loading} />
                </div>
            )}
        </div>
    );
};

export default Spinner;
