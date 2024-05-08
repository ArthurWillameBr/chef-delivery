"use client";

import React from "react";
import Image from "next/image";
import { Button } from "./button";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOut,
  MenuIcon,
  ScrollTextIcon,
} from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";

const Header = () => {
  const { data } = useSession();

  const handleSignOutClick = () => {
    signOut();
  };
  const handleSigInClick = () => {
    signIn();
  };
  return (
    <div className="flex justify-between px-5 pt-6">
      <Link href="/">
        <div className="relative h-[30px] w-[100px]">
          <Image
            src="/Logo.png"
            alt="logo"
            sizes="100%"
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
            {data?.user ? (
              <>
                <div className="flex items-center gap-3 pt-2 ">
                  <Avatar>
                    <AvatarImage
                      src={data?.user?.image as string | undefined}
                    />
                    <AvatarFallback>
                      {data?.user?.name?.split(" ")[0][0]}
                      {data?.user?.name?.split(" ")[1][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-left font-semibold">
                      {data?.user?.name}
                    </h3>
                    <span className="block text-xs text-muted-foreground ">
                      {data?.user?.email}
                    </span>
                  </div>
                </div>
                <div className="py-4">
                  <Separator />
                </div>
                <div className="space-y-2">
                  <div>
                    <Button
                      variant="ghost"
                      className="w-full items-center justify-start space-x-2 rounded-full"
                    >
                      <HomeIcon className="size-5" />{" "}
                      <span className="block">Início</span>
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                      asChild
                    >
                      <Link href="/my-orders">
                        <ScrollTextIcon size={16} />
                        <span className="block">Meus Pedidos</span>
                      </Link>
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="ghost"
                      className="w-full items-center justify-start space-x-2 rounded-full"
                      asChild
                    >
                      <Link href="/my-favorite-restaurants">
                        <HeartIcon size={16} />
                        <span className="block">Restaurantes Favoritos</span>
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="py-4">
                  <Separator />
                </div>
                <div>
                  <Button
                    variant="ghost"
                    className="w-full items-center justify-start space-x-2 rounded-full"
                    onClick={handleSignOutClick}
                  >
                    <LogOut className="size-5" />{" "}
                    <span className="block">Sair da conta</span>
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between pt-8">
                <h2 className="font-semibold">Faça seu login!</h2>
                <Button size="icon" onClick={handleSigInClick}>
                  <LogInIcon />
                </Button>
              </div>
            )}
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
