// src/components/ui/Drawer.tsx
import React from "react";
import classNames from "clsx";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={classNames(
        "fixed inset-0 z-50 flex",
        isOpen ? "visible" : "invisible"
      )}
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      {/* Drawer Content */}
      <div
        className={`transform transition-transform bg-white w-64 h-full shadow-lg ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Drawer;
