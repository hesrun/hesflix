'use client';
import { Movie } from '@/types/movie';
import { TV } from '@/types/tv';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState, ComponentPropsWithRef } from 'react';
import { EmblaCarouselType } from 'embla-carousel';
import { LucideArrowLeft, LucideArrowRight } from 'lucide-react';
import FilmCaruselCard from './FilmCaruselCard';

interface PropsParams {
    type: 'movie' | 'tv';
    data: TV[] | Movie[];
}

export default function FilmCaruselClient({ type, data }: PropsParams) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        dragFree: true,
        align: 'start',
    });

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaApi);

    return (
        <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex -mx-2">
                    {data.map((item) => (
                        <div
                            className="embla__slide w-1/6 shrink-0 px-2"
                            key={item.id}
                        >
                            <FilmCaruselCard type={type} data={item} />
                        </div>
                    ))}
                </div>
            </div>
            <PrevButton
                className={`absolute top-1/3 left-0 bg-black/80 p-2 cursor-pointer hover:bg-amber-500 transition-colors ${
                    prevBtnDisabled ? 'hidden' : ''
                }`}
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
            />
            <NextButton
                className={`absolute top-1/3 right-0 bg-black/80 p-2 cursor-pointer hover:bg-amber-500 transition-colors ${
                    nextBtnDisabled ? 'hidden' : ''
                }`}
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
            />
        </div>
    );
}

type UsePrevNextButtonsType = {
    prevBtnDisabled: boolean;
    nextBtnDisabled: boolean;
    onPrevButtonClick: () => void;
    onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
    emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

    const onPrevButtonClick = useCallback(() => {
        if (!emblaApi) return;
        emblaApi.scrollPrev();
    }, [emblaApi]);

    const onNextButtonClick = useCallback(() => {
        if (!emblaApi) return;
        emblaApi.scrollNext();
    }, [emblaApi]);

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        onSelect(emblaApi);
        emblaApi.on('reInit', onSelect).on('select', onSelect);
    }, [emblaApi, onSelect]);

    return {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    };
};

type PropType = ComponentPropsWithRef<'button'>;

export const PrevButton = (props: PropType) => {
    const { children, ...restProps } = props;
    return (
        <button type="button" {...restProps}>
            {children}
            <LucideArrowLeft />
        </button>
    );
};

export const NextButton = (props: PropType) => {
    const { children, ...restProps } = props;
    return (
        <button type="button" {...restProps}>
            {children}
            <LucideArrowRight />
        </button>
    );
};
