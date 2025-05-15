'use client'
import { FC } from 'react'
import Link from 'next/link'
import { useAppSelector } from '@/lib/redux/hooks'
import IconComponent from '@/components/shared/icon.component'
import { IconName } from '@/type'

const FooterComponent: FC = () => {

  const socials = useAppSelector(state => state.social.socials)

  return (
    <footer className="bg-gray-950 text-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary-500">
              Sobre el Blog
            </h3>
            <p className="text-sm text-gray-300">
              Un espacio dedicado a compartir conocimientos sobre programación,
              tecnología y desarrollo web.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary-500">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog"
                      className="text-sm text-gray-300 hover:text-accent-500 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/noticias"
                      className="text-sm text-gray-300 hover:text-accent-500 transition-colors">
                  Noticias
                </Link>
              </li>
              <li>
                <Link href="/proyectos"
                      className="text-sm text-gray-300 hover:text-accent-500 transition-colors">
                  Proyectos
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary-500">
              Síguenos
            </h3>
            <div className="flex space-x-4">
              {socials.data.socials.filter(s => s.icon !== 'mail').filter(s=> s.icon !== 'blog').map(social => (
                  <Link key={social.icon} href={social.url}
                     className="text-gray-300 hover:text-accent-500 transition-colors"
                     target="_blank"
                     rel="noopener noreferrer">
                    <span className="sr-only">GitHub</span>
                    <IconComponent icon={social.icon as IconName} />
                  </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-sm text-gray-300">
            © {new Date().getFullYear()} Tu Blog de Programación. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
