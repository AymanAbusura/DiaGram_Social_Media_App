import React, { useState } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';

import '@/scrollbar.css'
import { StoryCard } from './StoryCard';
import usePreventBodyScroll from '@/hooks/usePreventBodyScroll';

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
    const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;
  
    if (isThouchpad) {
      ev.stopPropagation();
      return;
    }
  
    if (ev.deltaY < 0) {
      apiObj.scrollNext();
    } else if (ev.deltaY > 0) {
      apiObj.scrollPrev();
    }
}

const elemPrefix = "test";
const getId = (index: number) => `${elemPrefix}${index}`;

const getItems = () =>
  Array(5)
    .fill(0)
    .map((_, ind) => ({ id: getId(ind) }));


const StoryList = () => {
    const [items] = useState(getItems);
    const { disableScroll, enableScroll } = usePreventBodyScroll();
  return (
    <div className='flex gap-1 w-1'>
        <div onMouseEnter={disableScroll} onMouseLeave={enableScroll} style={{position:'relative'}}>
            <ScrollMenu onWheel={onWheel}>
                <img src='/assets/icons/plus.svg' alt='add stories' width={20} height={20} style={{position:'absolute', bottom:'5%', right:'10%', backgroundColor:'white', borderRadius:'50%', borderWidth:'2%'}} />
                    <StoryCard itemId={''} />
            </ScrollMenu>
        </div>
        <div onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
            <ScrollMenu onWheel={onWheel}>
                {items.map(({ id }) => (
                    <StoryCard itemId={id} key={id} />
                ))}
            </ScrollMenu>
        </div>
    </div>
  )
}

export default StoryList