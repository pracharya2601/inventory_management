import QRCode from 'qrcode';
import { useEffect } from 'react';

const CreateQrCode = ({ value, pin }: { value?: string; pin: string }) => {
    const downloadQRCode = () => {
        const canvas = document.getElementById('qr-gen') as HTMLCanvasElement;
        const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `${new Date().toISOString()}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };
    useEffect(() => {
        if (!value) return;
        const container = document.getElementById('container-qrcode');
        QRCode.toCanvas(value, { errorCorrectionLevel: 'H' }, function (err, canvas) {
            if (err) throw err;
            canvas.setAttribute('id', 'qr-gen');
            canvas.setAttribute('class', 'h-48 w-48');
            container.appendChild(canvas);
        });
    }, [value]);
    return (
        <div
            className="max-w-max mb-5"
            onMouseOver={() => {
                const itm = document.getElementById('info-container');
                itm.classList.remove('hidden');
                itm.setAttribute('class', 'block');
            }}
            onMouseLeave={() => {
                const itm = document.getElementById('info-container');
                setTimeout(() => {
                    itm.classList.remove('block');
                    itm.setAttribute('class', 'hidden');
                }, 3000);
            }}
        >
            <p className="bg-gray-800 max-w-max my-1 px-2 py-1 cursor-pointer text-xs">Upload Image from CellPhone?</p>
            <div id="info-container" className="hidden">
                <p className="rounded-t text-center p-1 bg-gray-700 cursor-pointer">
                    <span className="text-gray-400 text-sm">PIN: </span>
                    <span className="text-gray-400 textmd">{pin}</span>
                </p>
                <div className="sm:block max-w-max text-gray-100 cursor-pointer" id="container-qrcode"></div>
                <p
                    onClick={downloadQRCode}
                    className="rounded-b hover:bg-gray-800 cursor-pointer text-center p-1 bg-gray-700"
                >
                    Download
                </p>
            </div>
        </div>
    );
};

export default CreateQrCode;
