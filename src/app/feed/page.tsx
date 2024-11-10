"use client"
import NavBar from "@/components/navbar/NavBar";
import React from 'react';
import BlogFeed from '@/components/feed/BlogFeed'


export default function FeedPosts() {
 
  return (
    <div>
      <NavBar />
      <div className="px-[15%] py-5 font-semibold text-2xl">
        Feed
        <BlogFeed/>
      </div>
    </div>
  );
}
