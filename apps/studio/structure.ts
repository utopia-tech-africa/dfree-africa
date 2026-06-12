import type {StructureResolver} from 'sanity/structure'
import {Folder, MessageSquareQuote, ReceiptCent, ShoppingBag} from 'lucide-react'

const testimonialPageFilters = [
  {title: 'All Testimonials', filter: '_type == "testimonial"'},
  {title: 'Home Page', filter: '_type == "testimonial" && page == "home"'},
  {
    title: 'BDC Page',
    filter: '_type == "testimonial" && page == "billion-dollar-challenge"',
  },
] as const

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // ---------------- Projects ----------------
      S.listItem()
        .title('Projects')
        .icon(Folder)
        .child(
          S.list()
            .title('Projects')
            .items([
              S.documentTypeListItem('project').title('All Projects'),
              S.documentTypeListItem('gallery').title('Gallery Files'),
              S.documentTypeListItem('year').title('Project Years'),
            ]),
        ),

      // ---------------- Testimonials ----------------
      S.listItem()
        .title('Testimonials')
        .icon(MessageSquareQuote)
        .child(
          S.list()
            .title('Testimonials')
            .items(
              testimonialPageFilters.map(({title, filter}) =>
                S.listItem()
                  .title(title)
                  .child(
                    S.documentList()
                      .title(title)
                      .filter(filter)
                      .defaultOrdering([{field: '_createdAt', direction: 'asc'}]),
                  ),
              ),
            ),
        ),

      // ---------------- Store ----------------
      S.listItem()
        .title('Store')
        .icon(ShoppingBag)
        .child(
          S.list()
            .title('Store')
            .items([S.documentTypeListItem('store').title('All Products')]),
        ),

      // ---------------- FinFest ----------------
      S.listItem()
        .title('FinFest')
        .icon(ReceiptCent)
        .child(
          S.list()
            .title('FinFest')
            .items([S.documentTypeListItem('pastSpeaker').title('Past Speakers')]),
        ),

      // ---------------- Other ----------------
      ...S.documentTypeListItems().filter(
        (id) =>
          !['project', 'gallery', 'year', 'store', 'pastSpeaker', 'testimonial'].includes(
            id.getId() ?? '',
          ),
      ),
    ])
