import React from 'react';

const SpinnerLoader = () => {
  return (
    <div role="status" className="flex items-center justify-center">
      <svg
        aria-hidden="true"
        className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-cyan-900"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 
          100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 
          0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08197 
          50.5908C9.08197 73.1865 27.4043 91.509 50 
          91.509C72.5957 91.509 90.918 73.1865 90.918 
          50.5908C90.918 27.9951 72.5957 9.67273 50 
          9.67273C27.4043 9.67273 9.08197 27.9951 9.08197 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 
          97.0079 33.5531C95.2932 28.8227 92.871 24.3692 
          89.8167 20.348C85.8452 15.1192 80.8826 
          10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 
          1.94025 56.7698 1.05124C51.7666 0.367541 
          46.6976 0.446843 41.7345 1.27873C39.2617 
          1.69328 37.813 4.19778 38.4501 
          6.62326C39.0873 9.04874 41.5694 
          10.4717 44.0505 10.1071C47.8511 
          9.5314 51.7191 9.49527 55.5402 
          10.0039C60.864 10.7309 65.9928 
          12.5457 70.6331 15.343C75.2735 
          18.1402 79.3347 21.8611 82.5849 
          26.2637C84.9175 29.4326 86.7992 
          32.9257 88.1811 36.6432C89.083 39.0168 
          91.5422 40.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default SpinnerLoader;
