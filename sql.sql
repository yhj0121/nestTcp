
drop table if exists public.country;
create table public.country(
  id serial not null primary key,
  osm_id integer,
  name text,
  uppername text,
  geom geometry(multipolygon, 3857)
);
create index gix_country on public.country using gist(geom);
delete from public.country;
insert into public.country(osm_id, name, uppername, geom) 
    SELECT planet_osm_polygon.osm_id,
      planet_osm_polygon.name as name,
      upper(planet_osm_polygon.name) AS uppername,
      st_multi(planet_osm_polygon.way)::geometry(MultiPolygon, 3857) as way
    FROM planet_osm_polygon
    WHERE planet_osm_polygon.admin_level = '2'::text AND planet_osm_polygon.boundary = 'administrative'::text;

drop table if exists public.amenity;
create table public.amenity(
	id serial not null primary key,
	osm_id integer,
	geom geometry(multipolygon, 3857)
);
create index gix_amenity on public.amenity using gist(geom);
delete from public.amenity;
insert into public.amenity(osm_id, geom) 
	SELECT planet_osm_polygon.osm_id,
    st_multi(planet_osm_polygon.way)::geometry(MultiPolygon, 3857) as way
   FROM planet_osm_polygon
  WHERE planet_osm_polygon.amenity IS NOT NULL AND (planet_osm_polygon.amenity = ANY (ARRAY['college'::text, 'community_centre'::text, 'courthouse'::text, 'doctors'::text, 'embassy'::text, 'grave_yard'::text, 'hospital'::text, 'library'::text, 'marketplace'::text, 'prison'::text, 'public_building'::text, 'school'::text, 'simming_pool'::text, 'theatre'::text, 'townhall'::text, 'university'::text]));
--delete from osm.amenity where not st_intersects(st_centroid(geom), (select geom from osm.country limit 1));

drop table if exists public.boundary;
create table public.boundary(
	id serial not null primary key,
	osm_id integer,
	name text,
	uppername text,
	geom geometry(multipolygon, 3857)
);
create index gix_boundary on public.boundary using gist(geom);
delete from public.boundary;
insert into public.boundary(osm_id, name, uppername, geom) 
	SELECT planet_osm_polygon.osm_id,
    planet_osm_polygon.name as name,
    upper(planet_osm_polygon.name) AS uppername,
    st_multi(planet_osm_polygon.way)::geometry(MultiPolygon, 3857) as way
  FROM planet_osm_polygon
  WHERE planet_osm_polygon.admin_level = '2'::text AND planet_osm_polygon.boundary = 'administrative'::text;

drop table if exists public.buildings;
create table public.buildings(
  id serial not null primary key,
  osm_id integer,
  name text,
  housename text,
  housenumber text,
  geom geometry(multipolygon, 3857)
);
create index gix_buildings on public.buildings using gist(geom);
delete from public.buildings;
insert into public.buildings(osm_id, name, housename, housenumber, geom) 
    SELECT planet_osm_polygon.osm_id, 
      planet_osm_polygon.name,  
      planet_osm_polygon."addr:housename",
       planet_osm_polygon."addr:housenumber",
      st_multi(planet_osm_polygon.way)::geometry(MultiPolygon, 3857) as way
    FROM planet_osm_polygon
    WHERE planet_osm_polygon.building IS NOT NULL AND st_area(planet_osm_polygon.way) < 100000::double precision;
--delete from osm.buildings where not st_intersects(geom, (select geom from osm.country));

drop table if exists public.county;
create table public.county(
	id serial not null primary key,
	osm_id integer,
	name text,
	uppername text,
	geom geometry(multipolygon, 3857)
);
create index gix_county on public.county using gist(geom);
delete from public.county;
insert into public.county(osm_id, name, uppername, geom) 
	SELECT planet_osm_polygon.osm_id, 
    	planet_osm_polygon.name as name,  
    	upper(planet_osm_polygon.name) AS uppername,
    	st_multi(planet_osm_polygon.way)::geometry(MultiPolygon, 3857) as way
   	FROM planet_osm_polygon
  	WHERE (planet_osm_polygon.place = 'county'::text OR planet_osm_polygon.admin_level = '6'::text AND planet_osm_polygon.name = 'Budapest'::text) AND planet_osm_polygon.boundary = 'administrative'::text;
delete from public.county where not st_intersects(st_centroid(geom), (select geom from public.country limit 1));

drop table if exists public.district;
create table public.district(
  id serial not null primary key,
  osm_id integer,
  name text,
  uppername text,
  geom geometry(multipolygon, 3857)
);
create index gix_district on public.district using gist(geom);
delete from public.district;
insert into public.district(osm_id, name, uppername, geom) 
  SELECT planet_osm_polygon.osm_id, 
    planet_osm_polygon.name, 
    upper(planet_osm_polygon.name) AS uppername,
    st_multi(planet_osm_polygon.way)::geometry(MultiPolygon, 3857) as way
  FROM planet_osm_polygon
  WHERE planet_osm_polygon.admin_level = '9'::text AND planet_osm_polygon.boundary = 'administrative'::text;
delete from public.district where not st_intersects(st_centroid(geom), (select geom from public.country limit 1));

drop table if exists public.forestpark;
create table public.forestpark(
  id serial not null primary key,
  osm_id integer,
  name text,
  geom geometry(multipolygon, 3857)
);
create index gix_forestpark on public.forestpark using gist(geom);
delete from public.forestpark;
insert into public.forestpark(osm_id, name, geom) 
  SELECT planet_osm_polygon.osm_id, 
    planet_osm_polygon.name, 
    st_multi(planet_osm_polygon.way)::geometry(MultiPolygon, 3857) as way
  FROM planet_osm_polygon
  WHERE (planet_osm_polygon.landuse = ANY (ARRAY['forest'::text, 'orchard'::text, 'park'::text, 'plant_nursery'::text, 'grass'::text, 'greenfield'::text, 'meadow'::text, 'recreation_ground'::text, 'village_green'::text, 'vineyard'::text])) OR (planet_osm_polygon.leisure = ANY (ARRAY['nature_reserve'::text, 'park'::text, 'dog_park'::text, 'garden'::text, 'golf_course'::text, 'horse_riding'::text, 'recreation_ground'::text, 'stadium'::text]));
delete from public.forestpark where not st_intersects(st_centroid(geom), (select geom from public.country limit 1));

drop table if exists public.lakes;
create table public.lakes(
  id serial not null primary key,
  osm_id integer,
  name text,
  way_area real,
  geom geometry(multipolygon, 3857)
);
create index gix_lakes on public.lakes using gist(geom);
delete from public.lakes;
insert into public.lakes(osm_id, name, way_area, geom) 
  SELECT planet_osm_polygon.osm_id, 
    planet_osm_polygon.name,  
    planet_osm_polygon.way_area,
    st_multi(planet_osm_polygon.way)::geometry(MultiPolygon, 3857) as way
  FROM planet_osm_polygon
  WHERE planet_osm_polygon."natural" = 'water'::text AND (planet_osm_polygon.water IS NULL OR planet_osm_polygon.water IS NOT NULL AND planet_osm_polygon.water <> 'river'::text);
delete from public.lakes where not st_intersects(st_centroid(geom), (select geom from public.country limit 1));

drop table if exists public.minor_roads;
create table public.minor_roads(
  id serial not null primary key,
  osm_id integer,
  name text,
  geom geometry(multilinestring, 3857)
);
create index gix_minor_roads on public.minor_roads using gist(geom);
delete from public.minor_roads;
insert into public.minor_roads(osm_id, name, geom) 
  SELECT planet_osm_line.osm_id, 
    planet_osm_line.name,  
    st_multi(planet_osm_line.way)::geometry(MultiLineString, 3857) as way
  FROM planet_osm_line
  WHERE planet_osm_line.highway IS NOT NULL AND (planet_osm_line.highway <> ALL (ARRAY['motorway'::text, 'motorway_link'::text, 'trunk'::text, 'primary'::text, 'trunk_link'::text, 'primary_link'::text, 'secondary'::text, 'secondary_link'::text, 'road'::text, 'tertiary'::text, 'tertiary_link'::text, 'steps'::text, 'footway'::text, 'path'::text, 'pedestrian'::text, 'walkway'::text, 'service'::text, 'track'::text])) AND planet_osm_line.railway IS NULL OR planet_osm_line.railway = 'no'::text;
--delete from osm.minor_roads where not st_intersects(st_centroid(geom), (select geom from osm.country limit 1));

drop table if exists public.motorway;
create table public.motorway(
  id serial not null primary key,
  osm_id integer,
  name text,
  geom geometry(multilinestring, 3857)
);
create index gix_motorway on public.motorway using gist(geom);
delete from public.motorway;
insert into public.motorway(osm_id, name, geom) 
  SELECT planet_osm_line.osm_id, 
 	  planet_osm_line.name,  
    st_multi(planet_osm_line.way)::geometry(MultiLineString, 3857) as way
  FROM planet_osm_line
  WHERE planet_osm_line.highway = 'motorway'::text;
delete from public.motorway where not st_intersects(st_centroid(geom), (select geom from public.country limit 1));

drop table if exists public.pedestrian;
create table public.pedestrian(
  id serial not null primary key,
  osm_id integer,
  name text,
  geom geometry(multilinestring, 3857)
);
create index gix_pedestrian on public.pedestrian using gist(geom);
delete from public.pedestrian;
insert into public.pedestrian(osm_id, name, geom) 
  SELECT planet_osm_line.osm_id, 
   	planet_osm_line.name, 
    st_multi(planet_osm_line.way)::geometry(MultiLineString, 3857) as way
  FROM planet_osm_line
  WHERE planet_osm_line.highway = ANY (ARRAY['steps'::text, 'footway'::text, 'path'::text, 'pedestrian'::text, 'walkway'::text, 'service'::text, 'track'::text]);
--delete from osm.pedestrian where not st_intersects(st_centroid(geom), (select geom from osm.country limit 1));

drop table if exists public.rails;
create table public.rails(
  id serial not null primary key,
  osm_id integer,
  name text,
  geom geometry(multilinestring, 3857)
);
create index gix_rails on public.rails using gist(geom);
delete from public.rails;
insert into public.rails(osm_id, name, geom) 
  SELECT planet_osm_line.osm_id, 
    planet_osm_line.name,  
    st_multi(planet_osm_line.way)::geometry(MultiLineString, 3857) as way
  FROM planet_osm_line
  WHERE planet_osm_line.railway IS NOT NULL AND (planet_osm_line.railway = ANY (ARRAY['light rail'::text, 'rail'::text, 'rail;construction'::text, 'tram'::text, 'yes'::text, 'traverser'::text])) OR planet_osm_line.railway ~~ '%rail%'::text;
--delete from osm.rails where not st_intersects(st_centroid(geom), (select geom from osm.country limit 1));

drop table if exists public.roads;
create table public.roads(
  id serial not null primary key,
  osm_id integer,
  name text,
  geom geometry(multilinestring, 3857)
);
create index gix_roads on public.roads using gist(geom);
delete from public.roads;
insert into public.roads(osm_id, name, geom) 
 SELECT planet_osm_line.osm_id, 
    planet_osm_line.name,  
    st_multi(planet_osm_line.way)::geometry(MultiLineString, 3857) as way
   FROM planet_osm_line
  WHERE planet_osm_line.highway = ANY (ARRAY['trunk_link'::text, 'primary_link'::text, 'secondary'::text, 'secondary_link'::text, 'road'::text, 'tertiary'::text, 'tertiary_link'::text]);
--delete from osm.roads where not st_intersects(st_centroid(geom), (select geom from osm.country limit 1));

drop table if exists public.settlements;
create table public.settlements(
  id serial not null primary key,
  osm_id integer,
  name text,
  uppername text,
  way_area real,
  geom geometry(multipolygon, 3857)
);
create index gix_settlements on public.settlements using gist(geom);
delete from public.settlements;
insert into public.settlements(osm_id, name, uppername, way_area, geom) 
  SELECT planet_osm_polygon.osm_id, 
    planet_osm_polygon.name, 
    upper(planet_osm_polygon.name) AS uppername,
    planet_osm_polygon.way_area,
    st_multi(planet_osm_polygon.way)::geometry(MultiPolygon, 3857) as way
  FROM planet_osm_polygon
  WHERE planet_osm_polygon.admin_level = '8'::text AND planet_osm_polygon.boundary = 'administrative'::text;
delete from public.settlements where not st_intersects(st_centroid(geom), (select geom from public.country limit 1));

drop table if exists public.subdistrict;
create table public.subdistrict(
  id serial not null primary key,
  osm_id integer,
  name text,
  uppername text,
  geom geometry(multipolygon, 3857)
);
create index gix_subdistrict on public.subdistrict using gist(geom);
delete from public.subdistrict;
insert into public.subdistrict(osm_id, name, uppername, geom) 
  SELECT planet_osm_polygon.osm_id, 
    planet_osm_polygon.name,  
    upper(planet_osm_polygon.name) AS uppername,
    st_multi(planet_osm_polygon.way)::geometry(MultiPolygon, 3857) as way
  FROM planet_osm_polygon
  WHERE planet_osm_polygon.admin_level = '10'::text AND planet_osm_polygon.boundary = 'administrative'::text;
delete from public.subdistrict where not st_intersects(st_centroid(geom), (select geom from public.country limit 1));

drop table if exists public.trunk_primary;
create table public.trunk_primary(
  id serial not null primary key,
  osm_id integer,
  name text,
  geom geometry(multilinestring, 3857)
);
create index gix_trunk_primary on public.trunk_primary using gist(geom);
delete from public.trunk_primary;
insert into public.trunk_primary(osm_id, name, geom) 
  SELECT planet_osm_line.osm_id, 
    planet_osm_line.name, 
    st_multi(planet_osm_line.way)::geometry(MultiLineString, 3857) as way
  FROM planet_osm_line
  WHERE planet_osm_line.highway = ANY (ARRAY['motorway_link'::text, 'trunk'::text, 'primary'::text]);
--delete from osm.trunk_primary where not st_intersects(st_centroid(geom), (select geom from osm.country limit 1));

drop table if exists public.water;
create table public.water(
  id serial not null primary key,
  osm_id integer,
  name text,
  geom geometry(multipolygon, 3857)
);
create index gix_water on public.water using gist(geom);
delete from public.water;
insert into public.water(osm_id, name, geom) 
  SELECT planet_osm_polygon.osm_id, 
    planet_osm_polygon.name,  
    st_multi(planet_osm_polygon.way)::geometry(MultiPolygon, 3857) as way
  FROM planet_osm_polygon
  WHERE planet_osm_polygon."natural" = 'water'::text OR planet_osm_polygon.water IS NOT NULL OR planet_osm_polygon.waterway ~~ '%riverbank%'::text;
--delete from osm.water where not st_intersects(st_centroid(geom), (select geom from osm.country limit 1));

drop table if exists public.waterway;
create table public.waterway(
  id serial not null primary key,
  osm_id integer,
  name text,
  waterway text,
  geom geometry(multilinestring, 3857)
);
create index gix_waterway on public.waterway using gist(geom);
delete from public.waterway;
insert into public.waterway(osm_id, name, waterway, geom) 
  SELECT planet_osm_line.osm_id, 
    planet_osm_line.name,  
    planet_osm_line.waterway,
    st_multi(planet_osm_line.way)::geometry(MultiLineString, 3857) as way
  FROM planet_osm_line
  WHERE planet_osm_line.waterway = ANY (ARRAY['drain'::text, 'canal'::text, 'waterfall'::text, 'river'::text, 'stream'::text, 'yes'::text]);
--delete from osm.waterway where not st_intersects(st_centroid(geom), (select geom from osm.country limit 1));