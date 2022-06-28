import React from 'react';
import Button from '@material-ui/core/Button';
export default function Add() {
  // const [checkedState, setCheckedState] = useState(
  //   new Array(rules.length).fill(false)
  // );

  return (
    <div style={{ backgroundColor: '#E5E5E5' }} className="w-full h-screen ">
      <div className="h-8"> </div>
      <div className="bg-white ml-64 rounded-tl-[80px] h-[87%]">
        <div className="bg-white h-16 mt-16 rounded-tl-full">
          <div className="flex ml-8">
            <i className="fa-solid fa-chevron-left m-4" />
            <div className="mt-2">
              <p
                style={{ color: '#132B6B' }}
                className="font-sans font-semibold"
              >
                Add
              </p>
              <p
                style={{ color: '#F66B6B', fontSize: '12px' }}
                className="font-sans"
              >
                Dashboard | <span style={{ color: '#132B6B' }}>Add</span>
              </p>
            </div>
          </div>
        </div>
        <div
          style={{ backgroundColor: '#F7F8FA', height: '102px' }}
          className=""
        >
          <div className="ml-8">
            <div className="pt-3 text-sm font-semibold">
              Selected Rules & Sub Rules
            </div>
            <div style={{ color: '#132B6B' }} className="font-semibold">
              Rule A
            </div>
            <div className="flex text-xs">
              <div>Sub Rule 1</div>
              <div className="ml-3">Sub Rule 2</div>
              <div className="ml-3">Sub Rule 3</div>
            </div>
          </div>
        </div>

        <div className="ml-8 mr-16 ">
          <div className="pt-3 pb-6 text-sm font-semibold flex justify-between">
            <div>Choose No. of Rules</div>Button
          </div>

          <div className="flex justify-between">
            <form>
              <input type="checkbox" />
              <label className="ml-1 font-sans text-xs">Rule A</label>
              </form>
           
          </div>

          <div className="flex justify-between mt-2">
          <form>
              <input type="checkbox" />
              <label className="ml-1 font-sans text-xs">Rule A</label>
              </form>
            
          </div>

          <div className="pt-6 pb-6 text-sm font-semibold ">
            Choose No. of Sub Rules
          </div>
          <div className="flex justify-between">
          <form>
              <input type="checkbox" />
              <label className="ml-1 font-sans text-xs">Rule A</label>
              </form>
           
          </div>

          <div className="flex justify-between mt-2">
          <form>
              <input type="checkbox" />
              <label className="ml-1 font-sans text-xs">Rule A</label>
              </form>
            
          </div>
          <div className="pt-10">
            <button
              style={{
                backgroundColor: '#F66B6B',
                color: 'white',
                borderRadius: '50px',
              }}
              className="w-28 h-10"
            >
              ASSIGN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
