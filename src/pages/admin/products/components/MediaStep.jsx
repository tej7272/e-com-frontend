// steps/MediaStep.jsx
import { useFormikContext }          from 'formik'
import { Box, Typography, IconButton } from '@mui/material'
import { useCallback, useRef }       from 'react'
import DeleteOutlineIcon             from '@mui/icons-material/DeleteOutline'

const MediaStep = () => {
  const { values, setFieldValue, errors, touched } = useFormikContext()
  const inputRef = useRef()

  const handleFiles = useCallback((files) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    const maxSize    = 5 * 1024 * 1024 // 5MB

    const newImages = Array.from(files)
      .filter(file => {
        if (!validTypes.includes(file.type)) return false
        if (file.size > maxSize)             return false
        return true
      })
      .map(file => ({
        file,
        preview: URL.createObjectURL(file), // ✅ local preview URL
        name:    file.name,
      }))

    setFieldValue('images', [...values.images, ...newImages])
  }, [values.images, setFieldValue])

  // ✅ Drag and drop handlers
  const handleDrop = useCallback((e) => {
    e.preventDefault()
    handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  const handleDragOver = (e) => e.preventDefault()

  // ✅ Remove image and revoke object URL to free memory
  const handleRemove = (index) => {
    const updated = values.images.filter((_, i) => i !== index)
    URL.revokeObjectURL(values.images[index].preview)
    setFieldValue('images', updated)
  }

  // ✅ Reorder — move image left (make cover)
  const handleMakeCover = (index) => {
    if (index === 0) return
    const updated = [...values.images]
    const [moved] = updated.splice(index, 1)
    updated.unshift(moved)
    setFieldValue('images', updated)
  }

  return (
    <Box>
      {/* ── Upload zone ── */}
      <Box
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => inputRef.current.click()}
        sx={{
          border:        '1.5px dashed',
          borderColor:   touched.images && errors.images
                           ? 'error.main'
                           : 'divider',
          borderRadius:  2,
          p:             4,
          textAlign:     'center',
          cursor:        'pointer',
          bgcolor:       'background.default',
          transition:    'border-color 0.2s, background 0.2s',
          '&:hover': {
            borderColor: 'primary.main',
            bgcolor:     'action.hover',
          },
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
        <Typography variant="body2" fontWeight={500}>
          Drop images here or click to browse
        </Typography>
        <Typography variant="caption" color="text.secondary">
          PNG, JPG, WEBP · max 5MB each
        </Typography>
      </Box>

      {/* ── Validation error ── */}
      {touched.images && errors.images && (
        <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
          {errors.images}
        </Typography>
      )}

      {/* ── Previews ── */}
      {values.images.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            {values.images.length} image{values.images.length > 1 ? 's' : ''} selected
            · first image is the cover
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            {values.images.map((img, index) => (
              <Box
                key={img.preview}
                sx={{
                  position:     'relative',
                  width:         80,
                  height:        80,
                  borderRadius:  1.5,
                  overflow:      'hidden',
                  border:        '0.5px solid',
                  borderColor:   index === 0 ? 'primary.main' : 'divider',
                  cursor:        index === 0 ? 'default' : 'pointer',
                  flexShrink:    0,
                }}
              >
                {/* ── Thumbnail ── */}
                <img
                  src={img.preview}
                  alt={img.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* ── Cover badge ── */}
                {index === 0 && (
                  <Box sx={{
                    position:  'absolute',
                    top:        4,
                    left:       4,
                    bgcolor:   'primary.main',
                    color:     '#fff',
                    fontSize:   9,
                    fontWeight: 600,
                    px:         0.6,
                    py:         0.2,
                    borderRadius: 0.5,
                    lineHeight: 1.4,
                  }}>
                    Cover
                  </Box>
                )}

                {/* ── Hover overlay ── */}
                <Box sx={{
                  position:   'absolute',
                  inset:       0,
                  bgcolor:    'rgba(0,0,0,0.45)',
                  display:    'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap:         0.5,
                  opacity:     0,
                  transition: 'opacity 0.15s',
                  '&:hover':  { opacity: 1 },
                }}>
                  {/* ── Make cover ── */}
                  {index !== 0 && (
                    <IconButton
                      size="small"
                      onClick={(e) => { e.stopPropagation(); handleMakeCover(index) }}
                      title="Make cover"
                      sx={{ color: '#fff', p: 0.4 }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    </IconButton>
                  )}

                  {/* ── Delete ── */}
                  <IconButton
                    size="small"
                    onClick={(e) => { e.stopPropagation(); handleRemove(index) }}
                    title="Remove"
                    sx={{ color: '#fff', p: 0.4 }}
                  >
                    <DeleteOutlineIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </Box>
              </Box>
            ))}

            {/* ── Add more slot ── */}
            <Box
              onClick={() => inputRef.current.click()}
              sx={{
                width:          80,
                height:         80,
                borderRadius:   1.5,
                border:        '1px dashed',
                borderColor:   'divider',
                display:       'flex',
                alignItems:    'center',
                justifyContent:'center',
                cursor:        'pointer',
                color:         'text.tertiary',
                flexShrink:     0,
                '&:hover':     { borderColor: 'primary.main', color: 'primary.main' },
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default MediaStep