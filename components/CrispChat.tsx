"use client";

import React, { useEffect } from 'react'
import {Crisp} from 'crisp-sdk-web';

const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("b24ca0d0-5ec6-4da0-8c8a-7e5b06b399ef");
    }, []);

    return null;
}

export default CrispChat