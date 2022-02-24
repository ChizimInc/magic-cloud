const listVariants = {
    visible: i => ({
        opacity: 1,
        transition: {
            delay: i * 0.3
        }
    }),
    hidden: { opacity: 0 }
}

export { listVariants }