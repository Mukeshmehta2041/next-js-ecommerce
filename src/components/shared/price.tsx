import clsx from "clsx"
import { motion } from 'framer-motion'

const Price = ({
    amount,
    className,
    currencyCode = "USD",
    currencyCodeClassName,
}: {
    amount: string
    className?: string
    currencyCode: string
    currencyCodeClassName?: string
} & React.ComponentProps<"p">) => (
    <motion.p
        suppressHydrationWarning={true}
        className={className}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        {`${new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: currencyCode,
            currencyDisplay: "narrowSymbol",
        }).format(parseFloat(amount))}`}
        <motion.span
            className={clsx("ml-1 inline", currencyCodeClassName)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
        >
            {`${currencyCode}`}
        </motion.span>
    </motion.p>
)

export default Price