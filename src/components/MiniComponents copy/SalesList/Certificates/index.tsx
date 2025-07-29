import { ISaleStatus } from '@/interfaces/ISaleStatus';
import Image from 'next/image';
import React from 'react';

interface ICertificateProps {
    isCertificate: boolean;
}

const CertificateIconList = ({ isCertificate = false }: ICertificateProps) => {
    const iconSize = 20;
    return (
        <div className='flex gap-4 justify-around' style={{ opacity: isCertificate ? 1 : 0.1 }}>
            <Image src={"/images/icons/certificate_icon.svg"} width={iconSize+6} height={iconSize+6} alt="Certificado" />
            <Image src={"/images/icons/location.svg"} width={iconSize} height={iconSize} alt="Certificado" />
        </div>
    );
};

export default React.memo(CertificateIconList);
