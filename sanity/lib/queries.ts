import { defineQuery } from 'next-sanity';

export const STARTIUP_QUERY =
  defineQuery(`*[_type== 'startup' && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search ] | 
    order(_createdAt desc)
    {
    _id,
      title,
      slug,
      _createdAt,
      author -> {
        _id,
        name,
        image,
        bio},
      description,
      views,
      image,
      category
  }`);

export const STARTUP_BY_ID_QUERY =
  defineQuery(`*[_type== 'startup' && _id == $id][0]{
  _id,
    title,
    slug,
    _createdAt,
    author -> {
      _id,
      name,
      username,
      image,
      bio},
    description,
    views,
    image,
    category,
    pitch
}`);

export const STARTUP_VIEWS_QUERY =
  defineQuery(`*[_type== 'startup' && _id == $id][0]{
  _id,
    views
}`);
