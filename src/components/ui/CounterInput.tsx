import { Minus, Plus } from 'lucide-react';
import { Button } from './button';
import { MINUS_ONE, NINE_THOUSAND, ONE } from '@/constants';

type CounterInputProps = {
  value: number;
  onChangeValue: (value: number) => void;
  minValue?: number;
  maxValue?: number;
};

function CounterInput(props: CounterInputProps) {
  const { value, onChangeValue, minValue = ONE, maxValue = NINE_THOUSAND } = props;

  return (
    <div className="flex flex-row h-10 w-32 rounded-lg relative bg-transparent">
      <Button className="w-11 h-full bg-zinc-700 hover:bg-zinc-900" onClick={() => onChangeValue?.(value + MINUS_ONE)}>
        <Minus />
      </Button>
      <input
        type="number"
        className="outline-none focus:outline-none text-center w-full font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700"
        value={value}
        min={minValue}
        max={maxValue}
      />
      <Button className="w-11 h-full bg-zinc-700 hover:bg-zinc-900" onClick={() => onChangeValue?.(value + ONE)}>
        <Plus />
      </Button>
    </div>
  );
}

export default CounterInput;
