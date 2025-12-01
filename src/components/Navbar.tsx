import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

const menuItems = [
  {
    text: 'Home',
    link: '/',
    image: 'https://images.unsplash.com/photo-1536148935331-408321065b18?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNvZGluZ3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    text: 'subjects',
    link: '/subjects/resources',
    image: 'https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNvZGluZ3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    text: 'Syllabus',
    link: '/syllabus',
    image: 'https://plus.unsplash.com/premium_photo-1678566111481-8e275550b700?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNvZGluZ3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    text: 'datesheet',
    link: '/datesheet',
    image: 'https://plus.unsplash.com/premium_photo-1663100722417-6e36673fe0ed?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNvZGluZ3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    text: 'Explore',
    link: '/explore',
    image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D',
  },
];
  

const STAIRS_COUNT = 6;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stairsRefs = useRef<Array<HTMLDivElement | null>>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    stairsRefs.current = stairsRefs.current.slice(0, STAIRS_COUNT);
    const stairNodes = stairsRefs.current.filter(
      (node): node is HTMLDivElement => Boolean(node),
    );
    gsap.set(stairNodes, { yPercent: 100 });
    gsap.set(contentRef.current, { opacity: 0, y: 40 });

    const timeline = gsap
      .timeline({ paused: true })
      .to(
        stairNodes,
        {
          yPercent: 0,
          duration: 0.6,
          ease: 'power3.inOut',
          stagger: 0.08,
        },
        0,
      )
      .to(
        contentRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
        },
        0.25,
      );

    timeline.eventCallback('onReverseComplete', () => {
      setIsOverlayVisible(false);
    });

    timelineRef.current = timeline;

    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (!timelineRef.current) return;

    if (isMenuOpen) {
      setIsOverlayVisible(true);
      timelineRef.current.timeScale(1).play();
    } else {
      timelineRef.current.timeScale(1.2).reverse();
    }
  }, [isMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleNavigate = useMemo(() => (link: string) => {
    setIsMenuOpen(false);
    // Small delay to let menu close animation start, then navigate
    setTimeout(() => {
      navigate(link);
    }, 100);
  }, [navigate]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-sm border-b border-brutal">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <a
              href="/"
              className="text-2xl font-bold uppercase tracking-tighter hover:text-accent transition-colors"
            >
              UniConnect
            </a>

            <button
              type="button"
              aria-label="Open navigation"
              onClick={() => setIsMenuOpen(true)}
              className="flex h-12 w-12 items-center justify-center border-1 hover:bg-accent hover:text-background transition-colors"
            >
              <span className="sr-only">Open menu</span>
              <div className="flex flex-col gap-1.5">
                <span className="block h-0.5 w-6 bg-current" />
                <span className="block h-0.5 w-6 bg-current" />
                <span className="block h-0.5 w-6 bg-current" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      <div
        ref={overlayRef}
        className={`fixed inset-0 z-50 transition-opacity duration-500 ${
          isOverlayVisible
            ? 'pointer-events-auto opacity-100 visible'
            : 'pointer-events-none opacity-0 invisible'
        }`}
      >
        <div className="absolute inset-0">
          {Array.from({ length: STAIRS_COUNT }).map((_, index) => (
            <div
              key={index}
              ref={(el) => {
                stairsRefs.current[index] = el;
              }}
              className="absolute left-0 right-0 bg-background border-b border-border translate-y-full"
              style={{
                top: `${(index / STAIRS_COUNT) * 100}%`,
                height: `${100 / STAIRS_COUNT}%`,
              }}
            />
          ))}
        </div>

        <div
          ref={contentRef}
          className="relative z-10 flex h-full flex-col bg-background px-4 py-10 text-foreground opacity-0"
        >
          <div className="flex items-center justify-between border-b border-border pb-4">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Navigation</p>
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setIsMenuOpen(false)}
              className="flex h-12 w-12 items-center justify-center border-1 hover:bg-accent hover:text-background transition-colors"
            >
              {/* <span className="sr-only">Close menu</span> */}
              <div className="relative h-4 w-4">
               <X />
              </div>
            </button>
          </div>

          <div className="flex-1 overflow-hidden pt-6">
            <FlowingMenu items={menuItems} onNavigate={handleNavigate} />
          </div>
        </div>
      </div>
    </>
  );
};

interface MenuItemProps {
  link: string;
  text: string;
  image: string;
  onNavigate: (link: string) => void;
}

interface FlowingMenuProps {
  items?: Array<Omit<MenuItemProps, 'onNavigate'>>;
  onNavigate: (link: string) => void;
}

const FlowingMenu = ({ items = [], onNavigate }: FlowingMenuProps) => {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <nav className="flex h-full flex-col">
        {items.map((item, idx) => <MenuItem key={`${item.text}-${idx}`} {...item} onNavigate={onNavigate} />)}
      </nav>
    </div>
  );
};

const MenuItem = ({ link, text, image, onNavigate }: MenuItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);

  const animationDefaults = { duration: 0.6, ease: 'power3.out' };

  const findClosestEdge = (
    mouseX: number,
    mouseY: number,
    width: number,
    height: number,
  ): 'top' | 'bottom' => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const handleMouseEnter = (ev: MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' });
  };

  const handleMouseLeave = (ev: MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  const repeatedMarqueeContent = useMemo(
    () =>
      Array.from({ length: 4 }).map((_, idx) => (
        <Fragment key={idx}>
          <span className="p-[1vh_1vw_0] text-[4vh] font-normal uppercase leading-[1.2] text-[#060010]">
            {text}
          </span>
          <div
            className="my-[2em] mx-[2vw] h-[7vh] w-[200px] rounded-[50px] bg-cover bg-center p-[1em_0]"
            style={{ backgroundImage: `url(${image})` }}
          />
        </Fragment>
      )),
    [text, image],
  );

  return (
    <div
      ref={itemRef}
      // FIX APPLIED HERE: Added 'relative' and 'overflow-hidden'
      className="relative overflow-hidden flex-1 text-center shadow-[0_-1px_0_0_#fff] transition-colors hover:bg-accent/10"
    >
      <a
        className="relative flex h-full w-full cursor-pointer items-center justify-center font-semibold uppercase text-white text-[4vh] no-underline hover:text-[#060010]"
        onClick={() => onNavigate(link)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </a>

      <div
        ref={marqueeRef}
        className="pointer-events-none absolute inset-0 translate-y-[101%] overflow-hidden bg-teal-500"
      >
        <div ref={marqueeInnerRef} className="flex h-full w-[200%]">
          <div className="animate-marquee relative flex h-full w-[200%] items-center">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
