import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ items }) => {
  return (
    <nav className="flex mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
                <li key={index} className="inline-flex items-center">
                  {index > 0 && (
                     <span className="material-symbols-outlined text-gray-400 mx-1 text-sm">chevron_right</span>
                  )}
                  {isLast ? (
                     <span className="text-sm font-medium text-gray-500">{item.label}</span>
                  ) : (
                    <Link to={item.href} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                        {/* {index === 0 && <span className="material-symbols-outlined mr-1 text-lg">home</span>} */}
                        {item.label}
                    </Link>
                  )}
                </li>
            )
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
