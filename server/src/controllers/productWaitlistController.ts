import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { supabase } from '../config/supabase';
import { sendEmail, emailTemplates } from '../services/emailService';

export const createProductWaitlist = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ 
        success: false,
        message: 'Validation failed',
        errors: errors.array() 
      });
      return;
    }

    const { email } = req.body;

    // Save to database
    const { data: waitlist, error } = await supabase
      .from('product_waitlist')
      .insert([{ 
        email: email.trim().toLowerCase(),
        product: 'A.T.L.A.S. ENGINE',
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    // Send notification email to admin (non-blocking)
    const notificationEmail = emailTemplates.productWaitlistNotification(email);
    const adminEmail = process.env.ADMIN_EMAIL || 'matthew@mrecai.com';
    
    console.log(`📧 Sending admin notification to: ${adminEmail}`);
    
    sendEmail({
      to: adminEmail,
      subject: notificationEmail.subject,
      html: notificationEmail.html
    }).catch(err => console.error('Admin notification email failed:', err));

    // Send confirmation email to user (non-blocking)
    const confirmationEmail = emailTemplates.productWaitlistConfirmation(email);
    
    sendEmail({
      to: email,
      subject: confirmationEmail.subject,
      html: confirmationEmail.html
    }).catch(err => console.error('User confirmation email failed:', err));

    res.status(201).json({
      success: true,
      message: 'You\'re in. MRECAI will reach out before June 1.',
      data: {
        id: waitlist.id,
        email: waitlist.email,
        product: waitlist.product,
        created_at: waitlist.created_at
      }
    });
  } catch (error) {
    console.error('Product waitlist creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to join waitlist. Please try again or contact us directly at matthew@mrecai.com'
    });
  }
};
