type CalorieDisplayProps = {
    text: string
    calories: number
}

export default function CalorieDisplay({ calories, text }: CalorieDisplayProps) {
    return (
        <p className='text-green-600 grid grid-cols-2 py-2 items-center'>
            {text}
            <span className='text-xl text-orange text-end'>
                {calories}
            </span>
        </p>
    )
}
