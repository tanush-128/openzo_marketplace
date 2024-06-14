// pages/categories.tsx
"use client";
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import GlobalConsts from '~/constants/constants';

// pages/categories.tsx

// import { useState, useRef, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Image from 'next/image';
// import GlobalConsts from '../constants/constants';

interface Category {
    name: string;
    type: string;
    subCategories: { name: string }[];
}

const CategoriesPage = () => {
    const [currentSelected, setCurrentSelected] = useState<number>(0);
    const keys = useRef<Array<HTMLDivElement | null>>(Array(GlobalConsts.categories.length).fill(null));

    // const router = useRouter();

    useEffect(() => {
        if (keys.current[currentSelected]) {
            keys.current[currentSelected]?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }, [currentSelected]);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="shadow-lg bg-[#F7F0D7] w-20 overflow-y-auto no-scrollbar ">
                <div className="flex flex-col items-center">
                    <div className="h-10" />
                    {GlobalConsts.categories.map((category, index) => (
                        <div
                            key={category.name}
                            className={`w-full cursor-pointer ${currentSelected === index ? 'bg-white rounded-l-lg' : ''
                                }`}
                            onClick={() => setCurrentSelected(index)}
                        >
                            <div className="flex flex-col items-center py-4 px-2">
                                <Image
                                    src={`/assets/images/Categories page/${category.name}.png`}
                                    width={50}
                                    height={50}
                                    alt={category.name}
                                />
                                <p
                                    className={`text-center text-sm ${currentSelected === index ? 'font-bold' : ''
                                        }`}
                                >
                                    {category.name}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
                {GlobalConsts.categories.map((category, index) => (
                    // @ts-ignore
                    <div
                        key={category.name}
                        ref={(el) => { keys.current[index] = el }}
                    >
                        <div className="mb-4">
                            <h2 className="text-2xl font-bold">{category.name}</h2>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {category.subCategories.map((subCategory) => (
                                <div
                                    key={subCategory.name}
                                    className="cursor-pointer"

                                >
                                    <div className="p-4 flex items-center justify-center bg-[#e5f3f3] rounded-2xl">
                                        <Image
                                            src={`/assets/images/Categories page/${category.name}/${subCategory.name}.png`}
                                            width={42}
                                            height={42}
                                            alt={subCategory.name}
                                        />
                                    </div>
                                    <p className="text-center font-semibold text-sm">{subCategory.name}</p>
                                </div>
                            ))}
                        </div>
                        <hr className="my-4" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoriesPage;
