import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import photo from './image/Vector.png';

export default function HistoryCard() {
  return (
    <Card className="border-2 rounded-[20px] m-6 w-[424px] h-[202px]">
      <CardContent>
        <div className="flex">
          <img className="h-8 m-4" src={photo} />
          <div className="mt-[20px] ml-[20px]">
            <p className="text-[#132B6B] font-bold font-sans text-[15px]">
              Project Name Lorem ipsum dolor sit amet
            </p>
            <div className="flex justify-between mr-2 mt-[24px]">
              <div className="">
                <div className="w-[50px] bg-[#D8DCE5] rounded-[10px]">
                  <p className="text-[9px] text-center font-sans">Project ID</p>
                </div>
                <p className="text-[11px] font-bold text-[#132B6B] font-sans mt-2">
                  #0123456789
                </p>
              </div>
              <div>
                <div className="w-[55px] bg-[#D8DCE5] rounded-[10px]">
                  <p className="text-[9px] text-center font-sans">Department</p>
                </div>
                <p className="text-[11px] font-bold text-[#132B6B] font-sans mt-2">
                  Mining
                </p>
              </div>
              <div>
                <div className="w-[40px] bg-[#D8DCE5] rounded-[10px]">
                  <p className=" text-[9px] text-center font-sans">Created</p>
                </div>
                <p className="text-[11px] font-bold text-[#132B6B] font-sans mt-2">
                  15th January, 2018
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex m-3">
          <button
            className="h-9 m-4"
            style={{
              backgroundColor: '#F66B6B',
              color: 'white',
              borderRadius: '50px',
              width: '176px',
            }}
          >
            <div className="font-sans text-[14px]">DOWNLOAD REPORT</div>
          </button>
          <button
            className="w-28 h-9 m-4"
            style={{
              backgroundColor: '#66737E',
              color: 'white',
              borderRadius: '50px',
              width: '176px',
            }}
          >
            <div className="font-sans text-[14px]">VIEW REPORT</div>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
