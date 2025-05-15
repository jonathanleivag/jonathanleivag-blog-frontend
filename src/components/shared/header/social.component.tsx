'use client'

import { FC } from 'react'
import { motion } from 'framer-motion'
import { useAppSelector } from '@/lib/redux/hooks'
import IconComponent from '@/components/shared/icon.component'
import { IconName } from '@/type'

const socialIconVariants = {
    hidden: {scale: 0},
    "visible": (i: number) => ({
        scale: 1,
        transition: {
            delay: i * 0.1,
            type: "spring",
            stiffness: 260,
            damping: 20
        }
    }),
    hover: {
        scale: 1.2,
        rotate: 360,
        transition: {
            duration: 0.3
        }
    }
};

export const SocialComponentMobil: FC = () => {
    const socials = useAppSelector(state => state.social.socials)
    return <div className="flex items-center space-x-4 px-3 py-2">
        {socials.data.socials.filter(f => f.icon !== 'mail').filter(s=> s.icon !== 'blog').map((item, i) => (
            <motion.a
                key={item.name}
                href={item.url}
                className="text-gray-400 hover:text-accent-400"
                target="_blank"
                rel="noopener noreferrer"
                variants={socialIconVariants}
                custom={i}
                initial="hidden"
                animate="visible"
                whileHover="hover"
            >
                <span className="sr-only">{item.name}</span>
                <IconComponent icon={item.icon as IconName} />
            </motion.a>
        ))}
    </div>
}

const SocialComponent: FC = () => {
    const socials = useAppSelector(state => state.social.socials)
    console.log({socials: socials.data.socials.find(f => f.name === 'web')})
    return <div className="flex items-center space-x-4">
        {socials.data.socials.filter(f => f.icon !== 'mail').filter(s=> s.icon !== 'blog').map((item, i) => (
            <motion.a
                key={item.name}
                href={item.url}
                className="text-gray-400 hover:text-accent-400"
                target="_blank"
                rel="noopener noreferrer"
                variants={socialIconVariants}
                custom={i}
                initial="hidden"
                animate="visible"
                whileHover="hover"
            >
                <span className="sr-only">{item.name}</span>
                <IconComponent icon={item.icon as IconName} />
            </motion.a>
        ))}
    </div>
}

export default SocialComponent;
